import type { CategoryShort, TagObject } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import type { EntryGenerator } from './$types'

export const entries: EntryGenerator = async () => {
	const { rows, err } = await query<TagObject>(sql`SELECT tag FROM tags`)
	if (err) throw new Error('Database error: Failed to load tags')
	return rows
}

export const load = async (event) => {
	const tag = event.params.tag

	const { rows: categories, err } = await query<CategoryShort>(sql`
		SELECT c.id, c.name FROM categories c
		LEFT JOIN category_tags t ON c.id = t.category_id
		WHERE t.tag = ${tag}
		ORDER BY lower(name)
	`)

	if (err) error(500, 'Categories could not be loaded')

	return { categories, tag }
}
