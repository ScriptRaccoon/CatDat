import { get_client } from '$shared/db'
import { devlog } from '$shared/utils'
import { get_structure_parent_map } from './utils/structures'

const db = get_client({ readonly: false })

export function deduce_special_morphisms() {
	console.info('\n--- Deduce special morphisms ---')
	clear_deduced_special_morphisms()
	inherit_special_morphisms_from_parents()
	deduce_special_morphisms_by_rules()
	deduce_special_morphisms_of_dual_categories()
}

/**
 * Clears deduced special morphisms
 */
function clear_deduced_special_morphisms() {
	db.prepare(
		`DELETE FROM special_morphism_assignments
		WHERE is_deduced = TRUE`
	).run()
}

/**
 * Inherit special morphism assignments from parent categories
 */
function inherit_special_morphisms_from_parents() {
	type SpecialMorphism = { type: string; description: string; proof: string }

	const parent_map = get_structure_parent_map(db, 'category')

	const get_parent_special_morphisms = db.prepare<[string], SpecialMorphism>(
		`SELECT type, description, proof
		FROM special_morphism_assignments
		WHERE category_id = ? AND is_deduced = FALSE`
	)

	const insert_special_morphism = db.prepare(
		`INSERT INTO special_morphism_assignments (
			category_id, type, description, proof, is_deduced
		) VALUES (?, ?, ?, ?, TRUE)
		ON CONFLICT (category_id, type) DO NOTHING`
	)

	let inherited_count = 0

	for (const [category_id, parent_id] of parent_map) {
		const inherited_morphisms = new Map<string, SpecialMorphism>()
		let current_id = parent_id

		while (current_id) {
			const parent_entries = get_parent_special_morphisms.all(current_id)

			for (const entry of parent_entries) {
				if (!inherited_morphisms.has(entry.type)) {
					inherited_morphisms.set(entry.type, entry)
				}
			}

			current_id = parent_map.get(current_id) ?? null
		}

		for (const [type, entry] of inherited_morphisms) {
			const proof = `This follows from the <a href="/category/${parent_id}">parent</a>.`
			const res = insert_special_morphism.run(
				category_id,
				type,
				entry.description,
				proof
			)
			inherited_count += res.changes
		}
	}

	devlog(`Inherited ${inherited_count} special morphisms from parents`)
}

/**
 * Deduces special morphisms from the rules from the special_morphism_rules
 * table. We ignore duplicate assignments here because of overlaps
 * with previous deductions.
 */
function deduce_special_morphisms_by_rules() {
	type Rule = {
		property_id: string
		type: string
		description: string
		proof: string
	}

	const rules = db
		.prepare<[], Rule>(
			`SELECT property_id, type, description, proof
			FROM special_morphism_rules
			ORDER BY id`
		)
		.all()

	for (const { property_id, type, description, proof } of rules) {
		const res = db
			.prepare(
				`INSERT INTO special_morphism_assignments (
                    category_id,
                    type,
                    description,
                    proof,
                    is_deduced
                )
                SELECT
                    pa.structure_id,
                    ?,
                    ?,
                    ?,
                    TRUE
                FROM property_assignments pa
                WHERE pa.type = 'category'
                    AND pa.property_id = ?
                    AND pa.is_satisfied = TRUE
                ON CONFLICT (category_id, type) DO NOTHING`
			)
			.run(type, description, proof, property_id)

		devlog(
			`Deduced ${res.changes} descriptions of ${type} in ${property_id} categories`
		)
	}
}

/**
 * Deduce special morphisms in dual categories.
 * For example, monomorphisms in C describe epimorphisms in C^op.
 * We ignore duplicate assignments here because of overlaps
 * with previous deductions.
 */
function deduce_special_morphisms_of_dual_categories() {
	const res = db
		.prepare(
			`INSERT INTO special_morphism_assignments (
                category_id,
                type,
                description,
                proof,
                is_deduced
            )
            SELECT
                c.dual_structure_id,
                t.dual,
                m.description,
                'This is deduced from its dual category.',
                TRUE
            FROM structures c
            INNER JOIN special_morphism_assignments m ON m.category_id = c.id
            INNER JOIN special_morphism_types t ON t.type = m.type
            WHERE c.type = 'category' AND c.dual_structure_id IS NOT NULL
            ON CONFLICT (category_id, type) DO NOTHING`
		)
		.run()

	devlog(`Deduced ${res.changes} special morphisms by duality`)
}
