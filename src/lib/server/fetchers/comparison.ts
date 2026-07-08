import { error } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import { render_nested_formulas } from '$lib/server/formulas'
import { MAX_STRUCTURES_COMPARE } from '$lib/commons/compare.utils'
import type { ComparisonResult, StructureType } from '$lib/commons/types'
import { to_placeholders } from '$shared/utils'
import { PLURALS } from '$shared/config'

export function fetch_comparison_result(
	compared_ids: string[],
	type: StructureType,
	callback: () => void
): ComparisonResult {
	if (!compared_ids.length) error(400, `No ${type} selected for comparison`)

	if (compared_ids.length > MAX_STRUCTURES_COMPARE) {
		error(
			400,
			`It is only possible to compare up to ${MAX_STRUCTURES_COMPARE} ${PLURALS[type]}`
		)
	}

	const unsorted_structures = db
		.prepare<string[], { id: string; name: string; notation: string }>(
			`SELECT id, name, notation 
			FROM structures
			WHERE type = ?
			AND id in ${to_placeholders(compared_ids)}`
		)
		.all(type, ...compared_ids)

	const invalid_id = compared_ids.find((id) =>
		unsorted_structures.every((row) => row.id !== id)
	)
	if (invalid_id) error(404, `Could not find ${type} with ID '${invalid_id}'`)

	const structures = unsorted_structures.sort(
		(a, b) => compared_ids.indexOf(a.id) - compared_ids.indexOf(b.id)
	)

	const comparison_query = get_comparison_query(compared_ids)

	const comparison_table = db
		.prepare<string[], string[]>(comparison_query)
		.raw()
		.all(...compared_ids, type)

	callback()

	return {
		structures: render_nested_formulas(structures),
		comparison_table,
		type
	}
}

function get_comparison_query(compared_ids: string[]) {
	const columns = compared_ids.map(
		(_, i) =>
			`CASE 
				WHEN a${i}.is_satisfied = TRUE THEN 'yes'
				WHEN a${i}.is_satisfied = FALSE THEN 'no'
				ELSE 'unknown'
			END AS struct${i}`
	)

	const joins = compared_ids.map(
		(_, i) =>
			`LEFT JOIN property_assignments a${i}
			ON a${i}.property_id = p.id AND a${i}.structure_id = ?`
	)

	return `
		SELECT
			p.id AS property_id,
			${columns.join(',\n')}
		FROM properties p
		${joins.join('\n')}
		WHERE p.type = ?
		ORDER BY lower(p.id)`
}
