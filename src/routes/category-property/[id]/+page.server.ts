import { error } from '@sveltejs/kit'
import { render_nested_formulas } from '$lib/server/rendering'
import { decode_property_ID } from '$lib/commons/property.url'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type { CategoryShort, PropertyDB } from '$lib/commons/types'
import type { ImplicationDB } from '$lib/commons/types'
import { display_implication, display_property } from '$lib/server/utils'

export const load = async (event) => {
	const id = decode_property_ID(event.params.id)

	const { results, err } = await batch<
		[
			PropertyDB,
			{ id: string },
			ImplicationDB,
			CategoryShort & { is_satisfied: number },
			CategoryShort,
		]
	>([
		// basic information
		sql`
			SELECT
				id, relation, description, dual_property_id,
				nlab_link, invariant_under_equivalences
			FROM properties
			WHERE id = ${id}
		`,
		// related properties
		sql`
			SELECT related_property_id AS id
			FROM related_properties
			WHERE property_id = ${id}
			ORDER BY lower(id)
		`,
		// relevant implications
		sql`
			SELECT
				id,
				is_equivalence,
				reason,
				assumptions,
				conclusions,
				is_deduced
			FROM implications_view
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
		// known categories
		sql`
			SELECT c.id, c.name, cp.is_satisfied
			FROM category_property_assignments cp
			INNER JOIN categories c ON c.id = cp.category_id
			WHERE cp.property_id = ${id}
			ORDER BY lower(c.name)
		`,
		// unknown categories
		sql`
			SELECT c.id, c.name
			FROM categories c
			LEFT JOIN category_property_assignments cp
				ON cp.category_id = c.id
				AND cp.property_id = ${id}
			WHERE
				cp.property_id IS NULL
			ORDER BY lower(c.name)
		`,
	])

	if (err) error(500, 'Could not load property')

	const [
		properties,
		related,
		relevant_implications_db,
		known_categories,
		unknown_categories,
	] = results

	if (!properties.length) error(404, 'Property not found')

	const property = display_property(properties[0])

	const related_properties = related.map(({ id }) => id)

	const examples = known_categories.filter((c) => c.is_satisfied)
	const counterexamples = known_categories.filter((c) => !c.is_satisfied)

	const relevant_implications = relevant_implications_db.map(display_implication)

	return render_nested_formulas({
		property,
		related_properties,
		examples,
		counterexamples,
		unknown_categories,
		relevant_implications,
	})
}
