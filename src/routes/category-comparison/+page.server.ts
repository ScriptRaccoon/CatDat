import type { StructureShort } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'

export const load = () => {
	const { rows: categories, err } = query<StructureShort>(sql`
		SELECT id, name FROM structures
		WHERE type = 'category'
		ORDER BY lower(name)
	`)

	if (err) error(500, 'Categories could not be loaded')

	return { categories }
}
