import { decode_property_ID } from '$lib/commons/property.url'
import type { CategoryShort } from '$lib/commons/types'
import { query } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
import { check_consistency } from '$lib/server/consistency'
import { to_placeholders } from '$lib/server/utils'

export const prerender = false

export const load = async (event) => {
	const satisfied_query = event.url.searchParams.get('satisfied')
	const unsatisfied_query = event.url.searchParams.get('unsatisfied')

	if (!satisfied_query && !unsatisfied_query) {
		error(400, 'No properties selected')
	}

	const { rows: all_properties_objects, err: err_all } = await query<{
		id: string
		dual_property_id: string | null
	}>(sql`
		SELECT id, dual_property_id FROM properties	ORDER BY lower(id)
	`)

	if (err_all) error(500, 'Failed to load properties')

	const all_properties = all_properties_objects.map(({ id }) => id)

	const dual_properties_dict: Record<string, string | null> = {}
	for (const row of all_properties_objects) {
		dual_properties_dict[row.id] = row.dual_property_id
	}

	const satisfied_properties = satisfied_query
		? satisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const unsatisfied_properties = unsatisfied_query
		? unsatisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const dual_satisfied_properties = satisfied_properties.map(
		(p) => dual_properties_dict[p],
	)

	const dual_unsatisfied_properties = unsatisfied_properties.map(
		(p) => dual_properties_dict[p],
	)

	const dual_search_available =
		dual_satisfied_properties.every(Boolean) &&
		dual_unsatisfied_properties.every(Boolean)

	const check = await check_consistency(
		new Set(satisfied_properties),
		new Set(unsatisfied_properties),
	)

	if (!check) error(500, 'Search failed')

	if (!check.consistent) {
		event.setHeaders({
			// shared cache for 30min
			'cache-control': 'public, max-age=0, s-maxage=1800',
		})

		return {
			is_consistent: false,
			all_properties,
			satisfied_properties,
			unsatisfied_properties,
			found_categories: [],
			dual_satisfied_properties,
			dual_unsatisfied_properties,
			dual_search_available,
		}
	}

	const all_props = satisfied_properties.concat(unsatisfied_properties)

	const search_query = `
  		SELECT c.id, c.name FROM categories c
		INNER JOIN category_property_assignments cp ON cp.category_id = c.id
  		WHERE property_id IN (${to_placeholders(all_props)})
  		GROUP BY category_id
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
		ORDER BY lower(c.name)
	`

	const { rows: found_categories, err } = await query<CategoryShort>({
		sql: search_query,
		values: [...all_props, ...satisfied_properties, ...unsatisfied_properties],
	})

	if (err) error(500, 'Search failed')

	event.setHeaders({
		// shared cache for 30min
		'cache-control': 'public, max-age=0, s-maxage=1800',
	})

	return {
		is_consistent: true,
		all_properties,
		satisfied_properties,
		unsatisfied_properties,
		found_categories,
		dual_satisfied_properties,
		dual_unsatisfied_properties,
		dual_search_available,
	}
}
