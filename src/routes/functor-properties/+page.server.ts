import type { PropertyShort } from '$lib/commons/types'
import { query } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async () => {
	const { rows: properties, err } = await query<PropertyShort>(sql`
        SELECT id, relation
        FROM functor_properties
        ORDER BY lower(id)
    `)

	if (err) error(500, 'Could not load properties')

	return { properties }
}
