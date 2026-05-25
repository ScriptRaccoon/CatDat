import type { StructureShort, TagObject } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import type { EntryGenerator } from './$types'

export const entries: EntryGenerator = async () => {
	const { rows, err } = query<TagObject>(sql`SELECT tag FROM functor_tags`)
	if (err) throw new Error('Database error: Failed to load tags')
	return rows
}

export const load = async (event) => {
	const tag = event.params.tag

	const { rows: functors, err } = query<StructureShort>(sql`
		SELECT f.id, f.name FROM functors f
		LEFT JOIN functor_tag_assignments t ON f.id = t.functor_id
		WHERE t.tag = ${tag}
		ORDER BY lower(name)
	`)

	if (err) error(500, 'Functors could not be loaded')

	return { functors, tag }
}
