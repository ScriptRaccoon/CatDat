import { get_client } from './utils/helpers'

const db = get_client()

/**
 * Ensures that selected properties of functors are restricted
 * to specified source and target categories.
 */
export function restrict_functor_properties() {
	console.info('\n--- Restrict functor properties ---')

	for (const domain of ['source', 'target']) {
		const res = db
			.prepare(
				`INSERT INTO functor_property_assignments (
                    functor_id,
                    property_id,
                    is_satisfied,
                    proof,
                    is_deduced
                )
                SELECT
                    f.id,
                    p.id,
                    FALSE,
                    'The ${domain} category is not ' || c.notation || '.',
                    FALSE
                FROM functor_properties p
                INNER JOIN categories c ON c.id = p.required_${domain}
                JOIN functors f
                WHERE f.${domain} <> p.required_${domain}`,
			)
			.run()

		console.info(
			`Restricted ${res.changes} functor properties based on their required ${domain}`,
		)
	}
}
