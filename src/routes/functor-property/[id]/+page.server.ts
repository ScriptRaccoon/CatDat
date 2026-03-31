import { decode_property_ID } from '$lib/commons/property.url'
import type {
	FunctorImplicationDB,
	FunctorImplicationDisplay,
	FunctorPropertyDB,
	FunctorShort,
} from '$lib/commons/types'
import { batch } from '$lib/server/db'
import { render_nested_formulas } from '$lib/server/rendering'
import { display_functor_implication, display_functor_property } from '$lib/server/utils'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
	const id = decode_property_ID(event.params.id)

	const { results, err } = await batch<
		[
			FunctorPropertyDB,
			FunctorImplicationDB,
			FunctorShort & { is_satisfied: number },
			FunctorShort,
		]
	>([
		// basic information
		sql`
            SELECT
                id,
                relation,
                description,
                nlab_link,
                invariant_under_equivalences,
                dual_property_id
            FROM
                functor_properties
            WHERE id = ${id}
        `,
		// relevant implications
		sql`
            SELECT
                id,
                is_equivalence,
                reason,
                assumptions,
                source_assumptions,
                target_assumptions,
                conclusions,
                dualized_from
            FROM functor_implications_view
            WHERE
                EXISTS (
                    SELECT 1
                    FROM json_each(conclusions)
                    WHERE value = ${id}
                )
                OR
                EXISTS (
                    SELECT 1
                    FROM json_each(assumptions)
                    WHERE value = ${id}
                )
            ORDER BY lower(assumptions) || ' ' || lower(conclusions)
        `,
		// known functors
		sql`
            SELECT f.id, f.name, fp.is_satisfied
            FROM functor_property_assignments fp
            INNER JOIN functors f ON f.id = fp.functor_id
            WHERE fp.property_id = ${id}
            ORDER BY lower(f.name)
        `,
		// unknown functors
		sql`
            SELECT f.id, f.name
            FROM functors f
            LEFT JOIN functor_property_assignments fp
                ON fp.functor_id = f.id
                AND fp.property_id = ${id}
            WHERE
                fp.property_id IS NULL
            ORDER BY lower(f.name)
        `,
	])

	if (err) error(500, 'Could not load properties')

	const [properties, relevant_implications_db, known_functors, unknown_functors] =
		results

	if (!properties.length) error(404, `There is no property with ID '${id}'`)

	const property = display_functor_property(properties[0])

	const relevant_implications: FunctorImplicationDisplay[] =
		relevant_implications_db.map(display_functor_implication)

	const examples = known_functors.filter((f) => f.is_satisfied)
	const counterexamples = known_functors.filter((f) => !f.is_satisfied)

	return render_nested_formulas({
		property,
		relevant_implications,
		examples,
		counterexamples,
		unknown_functors,
	})
}
