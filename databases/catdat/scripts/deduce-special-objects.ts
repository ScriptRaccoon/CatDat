import { get_client } from '$shared/db'

const db = get_client({ readonly: false })

export function deduce_special_objects() {
	console.info('\n--- Deduce special objects ---')
	clear_deduced_special_objects()
	deduce_special_objects_of_dual_categories()
}

/**
 * Clears deduced special objects
 */
function clear_deduced_special_objects() {
	db.prepare(`DELETE FROM special_objects WHERE is_deduced = TRUE`).run()
}

/**
 * Deduce special objects in dual categories.
 * For example, initial objects in C describe the terminal objects in C^op.
 */
function deduce_special_objects_of_dual_categories() {
	const res = db
		.prepare(
			`INSERT INTO special_objects (
                category_id,
                type,
                description,
                is_deduced
            )
            SELECT
                c.dual_structure_id,
                t.dual,
                o.description,
                TRUE
            FROM structures c
            INNER JOIN special_objects o ON o.category_id = c.id
            INNER JOIN special_object_types t ON t.type = o.type
            WHERE c.type = 'category' AND c.dual_structure_id IS NOT NULL`
		)
		.run()

	console.info(`Deduced ${res.changes} special objects by duality`)
}
