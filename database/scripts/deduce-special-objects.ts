import { get_client } from '$shared/db'
import { devlog } from '$shared/utils'
import { get_structure_parent_map } from './utils/structures'

const db = get_client({ readonly: false })

export function deduce_special_objects() {
	console.info('\n--- Deduce special objects ---')
	clear_deduced_special_objects()
	inherit_special_objects_from_parents()
	deduce_special_objects_of_dual_categories()
}

/**
 * Clears deduced special objects
 */
function clear_deduced_special_objects() {
	db.prepare(`DELETE FROM special_objects WHERE is_deduced = TRUE`).run()
}

/**
 * Inherit special object assignments from parent categories
 */
function inherit_special_objects_from_parents() {
	type SpecialObject = { type: string; description: string }

	const parent_map = get_structure_parent_map(db, 'category')

	const get_parent_special_objects = db.prepare<[string], SpecialObject>(
		`SELECT type, description FROM special_objects
		WHERE category_id = ? AND is_deduced = FALSE`
	)

	const insert_special_object = db.prepare(
		`INSERT INTO special_objects (category_id, type, description, is_deduced)
		VALUES (?, ?, ?, TRUE)
		ON CONFLICT (category_id, type) DO NOTHING`
	)

	let inherited_count = 0

	for (const [category_id, parent_id] of parent_map) {
		const inherited_objects = new Map<string, SpecialObject>()
		let current_id = parent_id

		while (current_id) {
			const parent_entries = get_parent_special_objects.all(current_id)

			for (const entry of parent_entries) {
				if (!inherited_objects.has(entry.type)) {
					inherited_objects.set(entry.type, entry)
				}
			}

			current_id = parent_map.get(current_id) ?? null
		}

		for (const [type, entry] of inherited_objects) {
			const res = insert_special_object.run(category_id, type, entry.description)
			inherited_count += res.changes
		}
	}

	devlog(`Inherited ${inherited_count} special objects from parents`)
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

	devlog(`Deduced ${res.changes} special objects by duality`)
}
