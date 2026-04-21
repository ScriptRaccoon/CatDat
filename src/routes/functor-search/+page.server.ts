import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
	const { rows, err } = await query<{ id: string }>(sql`
		SELECT id FROM functor_properties ORDER BY lower(id)
	`)

	if (err) error(500, 'Failed to load properties')

	const all_properties = rows.map(({ id }) => id)

	return { all_properties }
}
