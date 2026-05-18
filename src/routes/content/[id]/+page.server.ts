import { content_ids, get_rendered_content } from '$lib/server/markdown'
import { error } from '@sveltejs/kit'
import type { EntryGenerator } from './$types'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type { EntityShort, PropertyShort } from '$lib/commons/types'

export const entries: EntryGenerator = () => {
	return content_ids.map((id) => ({ id }))
}

export const load = async (event) => {
	const id = event.params.id
	const content = get_rendered_content(id)
	if (!content) error(404, 'Not Found')

	const { results, err: err_categories } = batch<
		[EntityShort, PropertyShort, { id: string }]
	>([
		sql`
			SELECT c.id, c.name FROM categories c
			WHERE EXISTS (
				SELECT 1
				FROM category_property_assignments cp
				WHERE
					cp.category_id = c.id
					AND cp.reason LIKE '%/content/' || ${id} || '%'
			)
		`,
		sql`
			SELECT id, relation FROM category_properties
			WHERE description LIKE '%/content/' || ${id} || '%'
		`,
		sql`
			SELECT id FROM category_implications
			WHERE reason LIKE '%/content/' || ${id} || '%'
		`,
	])

	if (err_categories) error(500, 'Could not load context')

	const [categories, category_properties, category_implications] = results

	return { ...content, categories, category_properties, category_implications }
}
