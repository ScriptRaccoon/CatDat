import type { CategoryShort } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'

export const load = async () => {
	const { rows: categories, err } = await query<CategoryShort>(sql`
		SELECT id, name FROM categories ORDER BY lower(name)
	`)

	if (err) error(500, 'Categories could not be loaded')

	return { categories }
}
