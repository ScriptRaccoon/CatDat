import { get_client } from './utils/helpers'

const db = get_client()

/**
 * Ensures that selected properties of functors are restricted
 * to specified target categories.
 * This can be extended to source categories if required.
 */
export function restrict_functor_properties() {
	console.info('\n--- Restrict functor properties ---')

	const res = db
		.prepare(
			`INSERT INTO property_assignments (
                type,
                structure_id,
                property_id,
                is_satisfied,
                proof,
                is_deduced,
                check_redundancy
            )
            SELECT
                'functor',
                f.id,
                r.functor_property_id,
                FALSE,
                'The target category is not ' || c.notation || '.',
                FALSE,
                FALSE
            FROM required_target_categories r
            INNER JOIN categories_view c ON c.id = r.category_id
            JOIN functors f
            WHERE f.target <> r.category_id
            ON CONFLICT DO NOTHING`,
		)
		.run()

	console.info(
		`Restricted ${res.changes} functor properties based on their required target`,
	)
}
