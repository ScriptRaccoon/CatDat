import { error } from '@sveltejs/kit'
import { render_nested_formulas } from '$lib/server/rendering'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type {
	CategoryDisplay,
	CategoryProperty,
	CategoryPropertyDB,
	CategoryShort,
	CommentObject,
	PropertyShort,
	RelatedCategory,
	SpecialMorphism,
	SpecialObject,
	TagObject,
} from '$lib/commons/types'

export const load = async (event) => {
	const id = event.params.id

	const { results, err } = await batch<
		[
			CategoryDisplay,
			RelatedCategory,
			TagObject,
			CategoryPropertyDB & { is_satisfied: number },
			PropertyShort,
			SpecialObject,
			SpecialMorphism,
			CategoryShort,
			CommentObject,
		]
	>([
		// basic information
		sql`
			SELECT
				c.id,
				c.name,
				c.notation,
				c.objects,
				c.morphisms,
				c.description,
				c.nlab_link,
				c.dual_category_id,
				d.name as dual_category_name,
				d.notation as dual_category_notation
			FROM categories c
			LEFT JOIN categories d ON d.id = c.dual_category_id
			WHERE c.id = ${id}
		`,
		// related categories
		sql`
			SELECT
				r.related_category_id AS id,
				c.name,
				c.notation
			FROM related_categories r
			INNER JOIN categories c ON c.id = r.related_category_id
			WHERE r.category_id = ${id}
			ORDER BY lower(c.name)
		`,
		// tags
		sql`
			SELECT ct.tag
			FROM category_tag_assignments ct
			INNER JOIN tags t ON t.tag = ct.tag
			WHERE ct.category_id = ${id}
			ORDER BY t.position
		`,
		// properties
		sql`
			SELECT
				cp.property_id AS id,
				cp.is_satisfied,
				cp.reason,
				cp.is_deduced,
				CASE
        			WHEN cp.is_satisfied = TRUE THEN p.relation
        			ELSE r.negation
    			END AS relation
			FROM category_property_assignments cp
			INNER JOIN category_properties p ON p.id = cp.property_id
			INNER JOIN relations r ON r.relation = p.relation
			WHERE cp.category_id = ${id}
			ORDER BY cp.position, lower(cp.property_id)
		`,
		// unknown properties
		sql`
			SELECT
				p.id,
				p.relation
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
			ORDER BY t.position
		`,
		// special morphisms
		sql`
			SELECT t.type, s.description, s.reason
			FROM special_morphism_types t
			LEFT JOIN special_morphisms s
				ON s.type = t.type AND s.category_id = ${id}
			ORDER BY t.position
		`,
		// undistinguishable categories
		sql`
			SELECT u.id, u.name
			FROM categories u
			JOIN category_properties p
			LEFT JOIN category_property_assignments cp
				ON cp.category_id = ${id} AND cp.property_id = p.id
			LEFT JOIN category_property_assignments up
				ON up.category_id = u.id AND up.property_id = p.id
			WHERE u.id != ${id}
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
			SELECT id, comment FROM category_comments
			WHERE category_id = ${id}
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

	const satisfied_properties: CategoryProperty[] = properties_db
		.filter((obj) => obj.is_satisfied)
		.map((p) => ({
			id: p.id,
			reason: p.reason,
			is_deduced: Boolean(p.is_deduced),
			relation: p.relation,
		}))

	const unsatisfied_properties: CategoryProperty[] = properties_db
		.filter((obj) => !obj.is_satisfied)
		.map((p) => ({
			id: p.id,
			reason: p.reason,
			is_deduced: Boolean(p.is_deduced),
			relation: p.relation,
		}))

	return render_nested_formulas({
		category,
		related_categories,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		special_objects,
		special_morphisms,
		undistinguishable_categories,
		comments,
	})
}
