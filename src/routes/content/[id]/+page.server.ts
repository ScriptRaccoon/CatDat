import { get_rendered_content } from '$lib/server/markdown'
import { error } from '@sveltejs/kit'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type { StructureShort, PropertyShort } from '$lib/commons/types'

export const load = async (event) => {
	const id = event.params.id
	const content = get_rendered_content(id)
	if (!content) error(404, 'Not Found')

	const { results, err: err_categories } = batch<
		[StructureShort, PropertyShort, { id: string }]
	>([
		sql`
			SELECT c.id, c.name FROM categories c
			WHERE EXISTS (
				SELECT 1
				FROM category_property_assignments cp
				WHERE
					cp.category_id = c.id
					AND cp.proof LIKE '%/content/' || ${id} || '%'
			)
		`,
		sql`
			SELECT id, relation FROM category_properties
			WHERE description LIKE '%/content/' || ${id} || '%'
		`,
		sql`
			SELECT id FROM category_implications
			WHERE proof LIKE '%/content/' || ${id} || '%'
		`,
	])

	if (err_categories) error(500, 'Could not load context')

	const [categories, category_properties, category_implications] = results

	return { ...content, categories, category_properties, category_implications }
}
