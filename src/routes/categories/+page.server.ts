import type { CategoryShort, TagObject } from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async () => {
	const { results, err } = await batch<[CategoryShort, TagObject]>([
		sql`SELECT id, name FROM categories ORDER BY lower(name)`,
		sql`SELECT tag FROM tags ORDER BY position`,
	])

	if (err) error(500, 'Categories could not be loaded')

	const [categories, tag_objects] = results

	const tags = tag_objects.map(({ tag }) => tag)

	return { categories, tags }
}
