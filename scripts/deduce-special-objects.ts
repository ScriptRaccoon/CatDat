import { Client } from '@libsql/client'

export async function deduce_special_objects(db: Client) {
	await deduce_special_objects_of_dual_categories(db)
}

async function deduce_special_objects_of_dual_categories(db: Client) {
	await db.execute(`
        INSERT INTO special_objects (category_id, type, description)
        SELECT c.dual_category_id, t.dual, o.description
        FROM categories c
        INNER JOIN special_objects o ON o.category_id = c.id
        INNER JOIN special_object_types t ON t.type = o.type
        WHERE c.dual_category_id IS NOT NULL
        ON CONFLICT DO NOTHING
    `)
}
