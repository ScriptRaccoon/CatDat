import { get_client } from '$shared/db'
import { devlog } from '$shared/utils'

const db = get_client({ readonly: false })

export function deduce_special_morphisms() {
	console.info('\n--- Deduce special morphisms ---')
	clear_deduced_special_morphisms()
	deduce_special_morphisms_by_rules()
	deduce_special_morphisms_of_dual_categories()
}

/**
 * Clears deduced special morphisms
 */
function clear_deduced_special_morphisms() {
	db.prepare(`DELETE FROM special_morphisms WHERE is_deduced = TRUE`).run()
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
				`INSERT INTO special_morphisms (
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
			`INSERT INTO special_morphisms (
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
            INNER JOIN special_morphisms m ON m.category_id = c.id
            INNER JOIN special_morphism_types t ON t.type = m.type
            WHERE c.type = 'category' AND c.dual_structure_id IS NOT NULL
            ON CONFLICT (category_id, type) DO NOTHING`
		)
		.run()

	devlog(`Deduced ${res.changes} special morphisms by duality`)
}
