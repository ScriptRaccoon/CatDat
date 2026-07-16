import { get_client } from '$shared/db'
import { devlog } from '$shared/utils'

const db = get_client({ readonly: false })

/**
 * Ensures that certain properties of morphisms are only satisfied
 * when the ambient categories have certain properties.
 */
export function restrict_morphism_properties() {
	restrict_normal_morphisms('mono')
	restrict_normal_morphisms('epi')
}

/**
 * Ensures that only morphisms in categories with zero morphisms can be
 * normal monomorphisms or normal epimorphisms.
 */
function restrict_normal_morphisms(variant: 'mono' | 'epi') {
	console.info(`\n--- Restrict normal ${variant}morphisms ---`)

	const res = db
		.prepare(
			`INSERT INTO property_assignments (
                structure_id,
                property_id,
                type,
                is_satisfied,
                proof,
                is_deduced,
                check_redundancy
            )
            SELECT
                m.id,
                ?,
                'morphism',
                FALSE,
                'The ' || c.name || ' has no zero morphisms.',
                TRUE,
                FALSE
            FROM morphisms m
            INNER JOIN property_assignments a
            ON a.structure_id = m.category
            INNER JOIN structures c
            ON c.id = m.category
            WHERE a.type = 'category'
            AND a.property_id = 'zero morphisms'
            AND a.is_satisfied = FALSE
            ON CONFLICT (structure_id, property_id)
            DO UPDATE SET
                proof = excluded.proof,
                is_deduced = excluded.is_deduced,
                check_redundancy = excluded.check_redundancy`
		)
		.run(`normal ${variant}morphism`)

	devlog(`Deduced that ${res.changes} morphisms cannot be normal ${variant}morphisms`)
}
