import { error } from '@sveltejs/kit'
import { render_nested_formulas } from '$lib/server/formulas'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type {
	SpecialMorphism,
	SpecialObject,
	CategorySpecificDisplay,
} from '$lib/commons/types'
import { fetch_structure } from '$lib/server/fetchers/structure'

export const load = (event) => {
	const id = event.params.id

	const {
		structure,
		related_structures,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		undistinguishable_structures,
		comments,
	} = fetch_structure('category', id)

	const { results, err } = batch<
		[CategorySpecificDisplay, SpecialObject, SpecialMorphism]
	>([
		// specific information for the category
		sql`
			SELECT c.objects, c.morphisms
			FROM categories c
			WHERE c.id = ${id}
		`,
		// special objects
		sql`
			SELECT s.type, s.description
			FROM special_objects s
			INNER JOIN special_object_types t ON t.type = s.type
			WHERE s.category_id = ${id}
			ORDER BY t.id
		`,
		// special morphisms
		sql`
			SELECT t.type, s.description, s.proof
			FROM special_morphism_types t
			LEFT JOIN special_morphisms s
				ON s.type = t.type AND s.category_id = ${id}
			ORDER BY t.id
		`,
	])

	if (err) error(500, 'Could not load category')

	const [categories, special_objects, special_morphisms] = results

	if (!categories.length) error(404, `Could not find category with ID '${id}'`)

	const category = {
		...structure,
		...categories[0],
		special_objects,
		special_morphisms,
	}

	return render_nested_formulas({
		category,
		related_structures,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		undistinguishable_structures,
		comments,
	})
}
