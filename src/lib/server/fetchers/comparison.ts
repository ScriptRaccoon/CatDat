import { error } from '@sveltejs/kit'
import { query } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/formulas'
import { MAX_STRUCTURES_COMPARE } from '$lib/commons/compare.utils'
import type { ComparisonResult, StructureType } from '$lib/commons/types'
import { PLURALS } from '$lib/commons/structures'
import { to_placeholders } from '$lib/server/utils'

export function fetch_comparison_result(
	compared_ids: string[],
	type: StructureType,
	callback: () => void,
): ComparisonResult {
	if (!compared_ids.length) error(400, `No ${type} selected for comparison`)

	if (compared_ids.length > MAX_STRUCTURES_COMPARE) {
		error(
			400,
			`It is only possible to compare up to ${MAX_STRUCTURES_COMPARE} ${PLURALS[type]}`,
		)
	}

	const { rows, err: err_cat } = query<{
		id: string
		name: string
		notation: string
	}>({
		sql: `
			SELECT id, name, notation 
			FROM structures
			WHERE type = ?
			AND id in (${to_placeholders(compared_ids)})`,
		values: [type, ...compared_ids],
	})

	if (err_cat) error(500, `Could not load ${PLURALS[type]}`)

	const invalid_id = compared_ids.find((id) => rows.every((row) => row.id !== id))
	if (invalid_id) error(404, `Could not find ${type} with ID '${invalid_id}'`)

	const structures = rows.sort(
		(a, b) => compared_ids.indexOf(a.id) - compared_ids.indexOf(b.id),
	)

	const select_columns = compared_ids
		.map(
			(_, i) =>
				`CASE 
					WHEN a${i}.is_satisfied = TRUE THEN 'yes'
					WHEN a${i}.is_satisfied = FALSE THEN 'no'
					ELSE 'unknown'
				END AS struct${i}`,
		)
		.join(',\n')

	const join_fragments: string[] = []
	const values: string[] = []

	compared_ids.forEach((id, i) => {
		join_fragments.push(`
			LEFT JOIN property_assignments a${i}
			ON a${i}.property_id = p.id AND a${i}.structure_id = ?
		`)
		values.push(id)
	})

	values.push(type)

	const comparison_query = `
		SELECT
			p.id AS property_id,
			${select_columns}
		FROM properties p
		${join_fragments.join('\n')}
		WHERE p.type = ?
		ORDER BY lower(p.id)`

	const { rows: comparison_objects, err } = query<Record<string, string>>({
		sql: comparison_query,
		values,
	})

	if (err) error(500, 'Could not load comparison table')

	const comparison_table = comparison_objects.map((obj) => Object.values(obj))

	callback()

	return {
		structures: render_nested_formulas(structures),
		comparison_table,
		type,
	}
}
