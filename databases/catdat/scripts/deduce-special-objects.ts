import type { Client } from '@libsql/client'

export async function deduce_special_objects(db: Client) {
	console.info('\n--- Deduce special objects ---')
	await deduce_special_objects_of_dual_categories(db)
}

/**
 * Deduce special objects in dual categories.
 * For example, initial objects in C describe the terminal objects in C^op.
 */
async function deduce_special_objects_of_dual_categories(db: Client) {
	const res = await db.execute(`
        INSERT INTO special_objects (category_id, type, description)
        SELECT
            c.dual_category_id,
            t.dual,
            o.description
        FROM categories c
        INNER JOIN special_objects o ON o.category_id = c.id
        INNER JOIN special_object_types t ON t.type = o.type
        WHERE c.dual_category_id IS NOT NULL
        ON CONFLICT DO NOTHING
    `)

	console.info(`Deduced ${res.rowsAffected} special objects by duality`)
}
