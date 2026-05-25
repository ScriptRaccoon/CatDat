import type { StructureShort, TagObject } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import type { EntryGenerator } from './$types'

export const entries: EntryGenerator = async () => {
	const { rows, err } = query<TagObject>(sql`SELECT tag FROM category_tags`)
	if (err) throw new Error('Database error: Failed to load tags')
	return rows
}

export const load = async (event) => {
	const tag = event.params.tag

	const { rows: categories, err } = query<StructureShort>(sql`
		SELECT c.id, c.name FROM categories c
		LEFT JOIN category_tag_assignments t ON c.id = t.category_id
		WHERE t.tag = ${tag}
		ORDER BY lower(name)
	`)

	if (err) error(500, 'Categories could not be loaded')

	return { categories, tag }
}
