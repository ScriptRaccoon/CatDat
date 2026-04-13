import { Client } from '@libsql/client'

export async function deduce_special_morphisms(db: Client) {
	await deduce_special_morphisms_of_dual_categories(db)
}

async function deduce_special_morphisms_of_dual_categories(db: Client) {
	const res = await db.execute(`
        INSERT INTO special_morphisms (category_id, type, description, reason)
        SELECT
            c.dual_category_id,
            t.dual,
            m.description,
            'This is deduced from its dual category.'
        FROM categories c
        INNER JOIN special_morphisms m ON m.category_id = c.id
        INNER JOIN special_morphism_types t ON t.type = m.type
        WHERE c.dual_category_id IS NOT NULL
        ON CONFLICT DO NOTHING
    `)

	console.info(`Dualized ${res.rowsAffected} special morphisms`)
}
