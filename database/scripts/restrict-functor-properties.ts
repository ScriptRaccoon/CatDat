import { get_client } from '$shared/db'
import { devlog } from '$shared/utils'

const db = get_client({ readonly: false })

/**
 * Ensures that only functors with codomain Set are representable.
 * When necessary, this can be extended to other properties in the future.
 */
export function restrict_representable_functors() {
	console.info('\n--- Restrict representable functors ---')

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
                f.id,
                'representable',
                'functor',
                FALSE,
                'The codomain is not $\\Set$.',
                TRUE,
                FALSE
            FROM functors f
            WHERE f.codomain <> 'Set'
            ON CONFLICT (structure_id, property_id)
            DO UPDATE SET
                proof = excluded.proof,
                is_deduced = excluded.is_deduced,
                check_redundancy = excluded.check_redundancy`
		)
		.run()

	devlog(`Deduced that ${res.changes} functors cannot be representable`)
}
