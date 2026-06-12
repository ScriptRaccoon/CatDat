import { decode_property_ID } from '$lib/commons/property.url'
import type { ImplicationDB, StructureShort, PropertyDB } from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/formulas'
import { display_implication, display_property } from '$lib/server/transforms'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = (event) => {
	const id = decode_property_ID(event.params.id)

	const { results, err } = batch<
		[
			PropertyDB,
			{ id: string },
			ImplicationDB,
			StructureShort & { is_satisfied: 0 | 1 | null },
			StructureShort,
		]
	>([
		// basic information
		sql`
            SELECT
                id,
                relation,
                description,
                dual_property_id,
                nlab_link,
                invariant_under_equivalences
            FROM properties
            WHERE type = 'functor' AND id = ${id}
        `,
		// related properties
		sql`
            SELECT related_property_id AS id
            FROM related_properties
            WHERE type = 'functor' AND property_id = ${id}
            ORDER BY lower(id)
        `,
		// relevant implications
		sql`
            SELECT
                id,
                is_equivalence,
                is_deduced,
                dualized_from,
                proof,
                assumptions,
                source_assumptions,
                target_assumptions,
                conclusions
            FROM implications_view
            WHERE type = 'functor'
            AND (
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
			)
            ORDER BY lower(assumptions) || ' ' || lower(conclusions)
        `,
		// known functors
		sql`
            SELECT s.id, s.name, cp.is_satisfied
            FROM property_assignments cp
            INNER JOIN structures s ON s.id = cp.structure_id
            WHERE
                cp.type = 'functor'
                AND s.type = 'functor'
                AND cp.property_id = ${id}
            ORDER BY lower(s.name)
        `,
		// unknown functors
		sql`
            SELECT s.id, s.name
            FROM structures s
            LEFT JOIN property_assignments cp
                ON cp.structure_id = s.id
                AND cp.property_id = ${id}
            WHERE
                cp.type = 'functor'
                AND s.type = 'functor'
                AND cp.property_id IS NULL
            ORDER BY lower(s.name)
        `,
	])

	if (err) error(500, 'Could not load properties')

	const [
		properties,
		related,
		relevant_implications_db,
		known_functors,
		unknown_functors,
	] = results

	if (!properties.length) error(404, 'Property not found')

	const property = display_property(properties[0])

	const related_properties = related.map(({ id }) => id)

	const examples = known_functors.filter((f) => f.is_satisfied === 1)
	const counterexamples = known_functors.filter((f) => f.is_satisfied === 0)
	const undecidable_functors = known_functors.filter((f) => f.is_satisfied === null)

	const relevant_implications = relevant_implications_db.map(display_implication)

	for (const impl of relevant_implications) {
		if (!impl.is_equivalence && impl.conclusions.includes(id)) {
			impl.conclusions = [id]
		}
	}

	return render_nested_formulas({
		property,
		related_properties,
		examples,
		counterexamples,
		unknown_functors,
		undecidable_functors,
		relevant_implications,
	})
}
