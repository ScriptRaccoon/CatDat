import type { StructureShort, TagObject } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import type { EntryGenerator } from './$types'

export const entries: EntryGenerator = async () => {
	const { rows, err } = query<TagObject>(sql`
		SELECT tag FROM tags WHERE type = 'category'
	`)
	if (err) throw new Error('Database error: Failed to load tags')
	return rows
}

export const load = async (event) => {
	const tag = event.params.tag

	const { rows: categories, err } = query<StructureShort>(sql`
		SELECT s.id, s.name FROM structures s
		LEFT JOIN structure_tag_assignments t ON s.id = t.structure_id
		WHERE t.tag = ${tag} AND s.type = 'category'
		ORDER BY lower(name)
	`)

	if (err) error(500, 'Categories could not be loaded')

	return { categories, tag }
}
