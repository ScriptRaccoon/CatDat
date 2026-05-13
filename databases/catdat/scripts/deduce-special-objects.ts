import { get_client } from './shared'

const db = get_client()

export function deduce_special_objects() {
	console.info('\n--- Deduce special objects ---')
	deduce_special_objects_of_dual_categories()
}

/**
 * Deduce special objects in dual categories.
 * For example, initial objects in C describe the terminal objects in C^op.
 */
async function deduce_special_objects_of_dual_categories() {
	const res = db
		.prepare(
			`INSERT INTO special_objects (category_id, type, description)
            SELECT
                c.dual_category_id,
                t.dual,
                o.description
            FROM categories c
            INNER JOIN special_objects o ON o.category_id = c.id
            INNER JOIN special_object_types t ON t.type = o.type
            WHERE c.dual_category_id IS NOT NULL
            ON CONFLICT DO NOTHING`,
		)
		.run()

	console.info(`Deduced ${res.changes} special objects by duality`)
}
