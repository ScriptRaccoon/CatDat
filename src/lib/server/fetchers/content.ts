import type { PropertyShort, StructureShort } from '$lib/commons/types'
import { db } from '$lib/server/db'

export function fetch_category_references(content_id: string) {
	const categories = db
		.prepare<[string], StructureShort>(
			`SELECT DISTINCT s.id, s.name
	        FROM property_assignments pa
	        INNER JOIN structures s ON s.id = pa.structure_id
	        WHERE pa.type = 'category'
	        AND pa.proof LIKE '%/content/' || ? || '%'`
		)
		.all(content_id)

	const category_properties = db
		.prepare<[string], PropertyShort>(
			`SELECT id, relation FROM properties
            WHERE type = 'category'
            AND description LIKE '%/content/' || ? || '%'`
		)
		.all(content_id)

	const category_implications = db
		.prepare<[string], { id: string }>(
			`SELECT id FROM implications
            WHERE type = 'category'
            AND proof LIKE '%/content/' || ? || '%'`
		)
		.all(content_id)

	return { categories, category_properties, category_implications }
}
