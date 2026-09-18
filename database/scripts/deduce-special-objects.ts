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
	db.prepare(`DELETE FROM special_object_assignments WHERE is_deduced = TRUE`).run()
}

/**
 * Inherit special object assignments from parent categories
 */
function inherit_special_objects_from_parents() {
	type SpecialObject = { kind: string; description: string }

	const parent_map = get_structure_parent_map(db, 'category')

	const get_parent_special_objects = db.prepare<[string], SpecialObject>(
		`SELECT kind, description FROM special_object_assignments
		WHERE category_id = ? AND is_deduced = FALSE`
	)

	const insert_special_object = db.prepare(
		`INSERT INTO special_object_assignments (
			category_id, kind, description, is_deduced
		) VALUES (?, ?, ?, TRUE)
		ON CONFLICT (category_id, kind) DO NOTHING`
	)

	let inherited_count = 0

	for (const [category_id, parent_id] of parent_map) {
		const inherited_objects = new Map<string, SpecialObject>()
		let current_id = parent_id

		while (current_id) {
			const parent_entries = get_parent_special_objects.all(current_id)

			for (const entry of parent_entries) {
				if (!inherited_objects.has(entry.kind)) {
					inherited_objects.set(entry.kind, entry)
				}
			}

			current_id = parent_map.get(current_id) ?? null
		}

		for (const [kind, entry] of inherited_objects) {
			const res = insert_special_object.run(category_id, kind, entry.description)
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
			`INSERT INTO special_object_assignments (
                category_id,
                kind,
                description,
                is_deduced
            )
            SELECT
                s.dual_structure_id,
                so.dual,
                soa.description,
                TRUE
            FROM structures s
            INNER JOIN special_object_assignments soa ON soa.category_id = s.id
            INNER JOIN special_objects so ON so.kind = soa.kind
            WHERE s.type = 'category' AND s.dual_structure_id IS NOT NULL`
		)
		.run()

	devlog(`Deduced ${res.changes} special objects by duality`)
}
