import { decode_property_ID } from '$shared/property.utils'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
import { get_contradiction } from '$lib/server/consistency'
import type { SearchResults, StructureShort, StructureType } from '$lib/commons/types'
import { to_placeholders } from '$shared/utils'

export function fetch_search_results(
	satisfied_query: string | null,
	unsatisfied_query: string | null,
	type: StructureType,
	callback: () => void
): SearchResults {
	if (!satisfied_query && !unsatisfied_query) {
		error(400, 'No properties selected')
	}

	const all_properties = db
		.prepare<[StructureType], { id: string; dual_property_id: string | null }>(
			`SELECT id, dual_property_id FROM properties
			WHERE type = ?
			ORDER BY lower(id)`
		)
		.all(type)

	const all_properties_ids = new Set(all_properties.map(({ id }) => id))

	const dual_properties_dict: Record<string, string | null> = {}
	for (const row of all_properties) {
		dual_properties_dict[row.id] = row.dual_property_id
	}

	const satisfied_properties = satisfied_query
		? satisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const invalid_satisfied_property = satisfied_properties.find(
		(p) => !all_properties_ids.has(p)
	)

	if (invalid_satisfied_property) {
		error(400, `Invalid property: ${invalid_satisfied_property}`)
	}

	const unsatisfied_properties = unsatisfied_query
		? unsatisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const invalid_unsatisfied_property = unsatisfied_properties.find(
		(p) => !all_properties_ids.has(p)
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

	const { contradiction } = get_contradiction(
		new Set(satisfied_properties),
		new Set(unsatisfied_properties),
		type
	)

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
		SELECT s.id, s.name
		FROM structures s
		INNER JOIN property_assignments a
		ON a.structure_id = s.id
		WHERE
			s.type = ? AND a.type = s.type
			AND property_id IN ${to_placeholders(all_selected_properties)}
		GROUP BY structure_id
		HAVING
			SUM (
				CASE
					WHEN
						property_id IN ${to_placeholders(satisfied_properties)}
						AND is_satisfied = TRUE
					THEN 1
					ELSE 0
				END
			) = ${satisfied_properties.length}
			AND
			SUM(
				CASE
					WHEN
						property_id IN ${to_placeholders(unsatisfied_properties)}
						AND is_satisfied = FALSE
					THEN 1
					ELSE 0
				END
			) = ${unsatisfied_properties.length}
		ORDER BY lower(s.name)
	`

	const found_structures = db
		.prepare<string[], StructureShort>(search_query)
		.all(
			type,
			...all_selected_properties,
			...satisfied_properties,
			...unsatisfied_properties
		)

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
