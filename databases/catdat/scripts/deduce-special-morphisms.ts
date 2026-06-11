import { get_client } from './utils/helpers'

const db = get_client()

// TODO: deduce further morphisms,
// e.g. isomorphisms = bijective morphisms in algebraic categories,
// e.g. regular monomorphisms = same as monomorphisms in mono-regular categories

export function deduce_special_morphisms() {
	console.info('\n--- Deduce special morphisms ---')
	deduce_special_morphisms_of_dual_categories()
}

/**
 * Deduce special morphisms in dual categories.
 * For example, monomorphisms in C describe epimorphisms in C^op.
 */
function deduce_special_morphisms_of_dual_categories() {
	const res = db
		.prepare(
			`INSERT INTO special_morphisms
                (category_id, type, description, proof)
            SELECT
                c.dual_structure_id,
                t.dual,
                m.description,
                'This is deduced from its dual category.'
            FROM structures c
            INNER JOIN special_morphisms m ON m.category_id = c.id
            INNER JOIN special_morphism_types t ON t.type = m.type
            WHERE c.type = 'category' AND c.dual_structure_id IS NOT NULL
            ON CONFLICT DO NOTHING`,
		)
		.run()

	console.info(`Deduced ${res.changes} special morphisms by duality`)
}
