import { decode_property_ID } from '$shared/property.utils'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
import { get_contradiction } from '$lib/server/consistency'
import type { SearchResults, StructureShort, StructureType } from '$lib/commons/types'
import { to_placeholders } from '$shared/utils'
import sql from 'sql-template-tag'

export function fetch_search_results(
	satisfied_query: string | null,
	unsatisfied_query: string | null,
	type: StructureType,
	callback: () => void
): SearchResults {
	if (!satisfied_query && !unsatisfied_query) {
		error(400, 'No properties selected')
	}

	const { rows: all_properties_objects, err: err_all } = query<{
		id: string
		dual_property_id: string | null
	}>(sql`
		SELECT id, dual_property_id FROM properties
		WHERE type = ${type}
		ORDER BY lower(id)
	`)

	if (err_all) error(500, 'Failed to load properties')

	const all_properties = new Set(all_properties_objects.map(({ id }) => id))

	const dual_properties_dict: Record<string, string | null> = {}
	for (const row of all_properties_objects) {
		dual_properties_dict[row.id] = row.dual_property_id
	}

	const satisfied_properties = satisfied_query
		? satisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const invalid_satisfied_property = satisfied_properties.find(
		(p) => !all_properties.has(p)
	)

	if (invalid_satisfied_property) {
		error(400, `Invalid property: ${invalid_satisfied_property}`)
	}

	const unsatisfied_properties = unsatisfied_query
		? unsatisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const invalid_unsatisfied_property = unsatisfied_properties.find(
		(p) => !all_properties.has(p)
	)

	if (invalid_unsatisfied_property) {
		error(400, `Invalid property: ${invalid_unsatisfied_property}`)
	}

	const dual_satisfied_properties = satisfied_properties.map(
		(p) => dual_properties_dict[p]
	)

	const dual_unsatisfied_properties = unsatisfied_properties.map(
		(p) => dual_properties_dict[p]
	)

	const dual_search_available =
		dual_satisfied_properties.every(Boolean) &&
		dual_unsatisfied_properties.every(Boolean)

	const { contradiction, err: err_con } = get_contradiction(
		new Set(satisfied_properties),
		new Set(unsatisfied_properties),
		type
	)

	if (err_con) error(500, 'Consistency check failed')

	if (contradiction) {
		callback()

		return {
			contradiction,
			satisfied_properties,
			unsatisfied_properties,
			dual_satisfied_properties,
			dual_unsatisfied_properties,
			dual_search_available,
			found_structures: [],
			type
		}
	}

	const all_selected_properties = [...satisfied_properties, ...unsatisfied_properties]

	const search_query = `
		SELECT s.id, s.name FROM structures s
		INNER JOIN property_assignments a ON a.structure_id = s.id
		WHERE
			s.type = ? AND a.type = s.type
			AND property_id IN (${to_placeholders(all_selected_properties)})
		GROUP BY structure_id
		HAVING
			SUM (
				CASE
					WHEN
						property_id IN (${to_placeholders(satisfied_properties)})
						AND is_satisfied = TRUE
					THEN 1
					ELSE 0
				END
			) = ${satisfied_properties.length}
			AND
			SUM(
				CASE
					WHEN
						property_id IN (${to_placeholders(unsatisfied_properties)})
						AND is_satisfied = FALSE
					THEN 1
					ELSE 0
				END
			) = ${unsatisfied_properties.length}
		ORDER BY lower(s.name)
	`

	const { rows: found_structures, err } = query<StructureShort>({
		sql: search_query,
		values: [
			type,
			...all_selected_properties,
			...satisfied_properties,
			...unsatisfied_properties
		]
	})

	if (err) error(500, 'Search failed')

	callback()

	return {
		contradiction: null,
		satisfied_properties,
		unsatisfied_properties,
		dual_satisfied_properties,
		dual_unsatisfied_properties,
		dual_search_available,
		found_structures,
		type
	}
}
