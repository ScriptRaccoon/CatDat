import type { PropertyShort, StructureShort } from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export function fetch_category_references(content_id: string) {
	const { results, err: err_categories } = batch<
		[StructureShort, PropertyShort, { id: string }]
	>([
		sql`
            SELECT DISTINCT s.id, s.name
            FROM property_assignments pa
            INNER JOIN structures s ON s.id = pa.structure_id
            WHERE
                pa.type = 'category'
                AND pa.proof LIKE '%/content/' || ${content_id} || '%'
                
        `,
		sql`
            SELECT id, relation FROM properties
            WHERE
                type = 'category'
                AND description LIKE '%/content/' || ${content_id} || '%'
        `,
		sql`
            SELECT id FROM implications
            WHERE
                type = 'category'
                AND proof LIKE '%/content/' || ${content_id} || '%'
        `,
	])

	if (err_categories) error(500, 'Could not load context')

	const [categories, category_properties, category_implications] = results

	return { categories, category_properties, category_implications }
}
