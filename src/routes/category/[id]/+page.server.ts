import { error } from '@sveltejs/kit'
import { render_nested_formulas } from '$lib/server/formulas'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type {
	PropertyAssignmentDB,
	CategoryDisplay,
	CommentObject,
	PropertyShort,
	RelatedStructure,
	SpecialMorphism,
	SpecialObject,
	TagObject,
	StructureShort,
} from '$lib/commons/types'
import { display_property_assignment } from '$lib/server/transforms'

export const load = async (event) => {
	const id = event.params.id

	const { results, err } = batch<
		[
			CategoryDisplay,
			RelatedStructure,
			TagObject,
			PropertyAssignmentDB,
			PropertyShort,
			SpecialObject,
			SpecialMorphism,
			StructureShort,
			CommentObject,
		]
	>([
		// basic information
		sql`
			SELECT
				c.id,
				s.name,
				s.notation,
				c.objects,
				c.morphisms,
				s.description,
				s.nlab_link,
				c.dual_category_id,
				ds.name AS dual_category_name,
				ds.notation AS dual_category_notation
			FROM categories c
			INNER JOIN structures s ON s.id = c.id
			LEFT JOIN structures ds ON ds.id = c.dual_category_id
			WHERE c.id = ${id}
		`,
		// related categories
		sql`
			SELECT
				c.id,
				c.name,
				c.notation
			FROM related_structures r
			INNER JOIN structures c ON c.id = r.related_structure_id
			WHERE r.structure_id = ${id} AND r.type = 'category'
			ORDER BY lower(c.name)
		`,
		// tags
		sql`
			SELECT st.tag
			FROM structure_tag_assignments st
			INNER JOIN tags t ON t.tag = st.tag
			WHERE st.structure_id = ${id} AND t.type = 'category'
			ORDER BY t.id
		`,
		// properties
		sql`
			SELECT
				cp.property_id AS id,
				cp.is_satisfied,
				cp.proof,
				cp.is_deduced,
				p.relation
			FROM category_property_assignments cp
			INNER JOIN category_properties p ON p.id = cp.property_id
			WHERE cp.category_id = ${id}
			ORDER BY cp.id
		`,
		// unknown properties
		sql`
			SELECT p.id, p.relation
			FROM category_properties p
			WHERE NOT EXISTS (
				SELECT 1 FROM category_property_assignments
				WHERE category_id = ${id} AND property_id = p.id
			)
			ORDER BY lower(p.id)
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
		// undistinguishable categories
		sql`
			SELECT u.id, u.name
			FROM structures u
			JOIN category_properties p
			LEFT JOIN category_property_assignments cp
				ON cp.category_id = ${id} AND cp.property_id = p.id
			LEFT JOIN category_property_assignments up
				ON up.category_id = u.id AND up.property_id = p.id
			WHERE u.type = 'category' AND u.id != ${id}
			GROUP BY u.id, u.name
			HAVING SUM(
				CASE
					WHEN cp.is_satisfied IS up.is_satisfied THEN 0
					ELSE 1
				END
			) = 0;
		`,
		// comments
		sql`
			SELECT id, comment FROM structure_comments
			WHERE structure_id = ${id}
		`,
	])

	if (err) error(500, 'Could not load category')

	const [
		categories,
		related_categories,
		tag_objects,
		properties_db,
		unknown_properties,
		special_objects,
		special_morphisms,
		undistinguishable_categories,
		comments,
	] = results

	if (!categories.length) error(404, `Could not find category with ID '${id}'`)

	const category = categories[0]
	const tags = tag_objects.map(({ tag }) => tag)

	const satisfied_properties = properties_db
		.filter((obj) => obj.is_satisfied === 1)
		.map(display_property_assignment)

	const unsatisfied_properties = properties_db
		.filter((obj) => obj.is_satisfied === 0)
		.map(display_property_assignment)

	const undecidable_properties = properties_db
		.filter((obj) => obj.is_satisfied === null)
		.map(display_property_assignment)

	return render_nested_formulas({
		category,
		related_categories,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		special_objects,
		special_morphisms,
		undistinguishable_categories,
		comments,
	})
}
