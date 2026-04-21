import type { RequestEvent } from '@sveltejs/kit'
import { decode_property_ID } from '$lib/commons/property.url'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
import { check_consistency } from '$lib/server/consistency'

type NamedObject = {
	id: string
	name: string
}

export async function search_handler(event: RequestEvent, type: 'category' | 'functor') {
	const satisfied_query = event.url.searchParams.get('satisfied')
	const unsatisfied_query = event.url.searchParams.get('unsatisfied')

	if (!satisfied_query && !unsatisfied_query) {
		error(400, 'No properties selected')
	}

	const { rows: all_properties_objects, err: err_all } = await query<{
		id: string
		dual_property_id: string | null
	}>(get_property_query(type))

	if (err_all) error(500, 'Failed to load properties')

	const all_properties = all_properties_objects.map(({ id }) => id)

	const dual_properties_dict: Record<string, string | null> = {}
	for (const row of all_properties_objects) {
		dual_properties_dict[row.id] = row.dual_property_id
	}

	const satisfied_properties = satisfied_query
		? satisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const invalid_satisfied_property = satisfied_properties.find(
		(p) => !all_properties.includes(p),
	)

	if (invalid_satisfied_property) {
		error(400, `Invalid property: ${invalid_satisfied_property}`)
	}

	const unsatisfied_properties = unsatisfied_query
		? unsatisfied_query.split(SEARCH_SEPARATOR).map(decode_property_ID)
		: []

	const invalid_unsatisfied_property = unsatisfied_properties.find(
		(p) => !all_properties.includes(p),
	)

	if (invalid_unsatisfied_property) {
		error(400, `Invalid property: ${invalid_unsatisfied_property}`)
	}

	const dual_satisfied_properties = satisfied_properties.map(
		(p) => dual_properties_dict[p],
	)

	const dual_unsatisfied_properties = unsatisfied_properties.map(
		(p) => dual_properties_dict[p],
	)

	const dual_search_available =
		dual_satisfied_properties.every(Boolean) &&
		dual_unsatisfied_properties.every(Boolean)

	// TODO: implement this for functors as well
	if (type === 'category') {
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
				found_objects: [],
				dual_satisfied_properties,
				dual_unsatisfied_properties,
				dual_search_available,
			}
		}
	}

	const all_selected_properties = satisfied_properties.concat(unsatisfied_properties)

	const search_query = get_search_query(
		satisfied_properties,
		unsatisfied_properties,
		all_selected_properties,
		type,
	)

	const { rows: found_objects, err } = await query<NamedObject>({
		sql: search_query,
		values: [
			...all_selected_properties,
			...satisfied_properties,
			...unsatisfied_properties,
		],
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
		found_objects,
		dual_satisfied_properties,
		dual_unsatisfied_properties,
		dual_search_available,
	}
}

function get_property_query(type: 'category' | 'functor') {
	if (type === 'category') {
		return sql`SELECT id, dual_property_id FROM properties ORDER BY lower(id)`
	}
	if (type === 'functor') {
		return sql`SELECT id, dual_property_id FROM functor_properties ORDER BY lower(id)`
	}
	throw new Error('Invalid type')
}

function to_placeholders(arr: string[]): string {
	return arr.map(() => '?').join(', ')
}

function get_search_query(
	satisfied_properties: string[],
	unsatisfied_properties: string[],
	all_selected_properties: string[],
	type: 'category' | 'functor',
) {
	if (type === 'category') {
		return `
            SELECT c.id, c.name FROM categories c
            INNER JOIN category_property_assignments cp ON cp.category_id = c.id
            WHERE property_id IN (${to_placeholders(all_selected_properties)})
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
	}

	if (type === 'functor') {
		return `
            SELECT f.id, f.name FROM functors f
            INNER JOIN functor_property_assignments fp ON fp.functor_id = f.id
            WHERE property_id IN (${to_placeholders(all_selected_properties)})
            GROUP BY functor_id
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
            ORDER BY lower(f.name)
	    `
	}

	throw new Error('Invalid type')
}
