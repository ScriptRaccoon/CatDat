import type {
	CommentObject,
	FunctorDisplay,
	PropertyAssignmentDB,
	PropertyShort,
	RelatedStructure,
	StructureShort,
	TagObject,
} from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/formulas'
import { display_property_assignment } from '$lib/server/transforms'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

// TODO: remove code duplication with category detail page

export const load = async (event) => {
	const id = event.params.id

	const { results, err } = batch<
		[
			FunctorDisplay,
			RelatedStructure,
			TagObject,
			PropertyAssignmentDB,
			PropertyShort,
			StructureShort,
			CommentObject,
		]
	>([
		// basic information
		sql`
            SELECT
                f.id,
				f.name,
				f.notation,
				f.source,
				f.target,
				f.description,
				f.nlab_link,
                s.name as source_name,
				t.name as target_name
            FROM functors f
            INNER JOIN categories s ON s.id = f.source
            INNER JOIN categories t ON t.id = f.target
            WHERE f.id = ${id}
        `,
		// related functors
		sql`
			SELECT
				r.related_functor_id AS id,
				f.name,
				f.notation
			FROM related_functors r
			INNER JOIN functors f ON f.id = r.related_functor_id
			WHERE r.functor_id = ${id}
			ORDER BY lower(f.name)
		`,
		// tags
		sql`
			SELECT ft.tag
			FROM functor_tag_assignments ft
			INNER JOIN functor_tags t ON t.tag = ft.tag
			WHERE ft.functor_id = ${id}
			ORDER BY t.id
		`,
		// properties
		sql`
			SELECT
				fp.property_id AS id,
				fp.is_satisfied,
				fp.reason,
				fp.is_deduced,
				CASE
        			WHEN fp.is_satisfied = FALSE THEN r.negation
        			ELSE p.relation
    			END AS relation
			FROM functor_property_assignments fp
			INNER JOIN functor_properties p ON p.id = fp.property_id
			INNER JOIN relations r ON r.relation = p.relation
			WHERE fp.functor_id = ${id}
			ORDER BY fp.id
		`,
		// unknown properties
		sql`
			SELECT p.id, p.relation
			FROM functor_properties p
			WHERE NOT EXISTS (
				SELECT 1 FROM functor_property_assignments
				WHERE functor_id = ${id} AND property_id = p.id
			)
			ORDER BY lower(p.id)
		`,
		// undistinguishable functors
		sql`
			SELECT u.id, u.name
			FROM functors u
			JOIN functor_properties p
			LEFT JOIN functor_property_assignments fp
				ON fp.functor_id = ${id} AND fp.property_id = p.id
			LEFT JOIN functor_property_assignments up
				ON up.functor_id = u.id AND up.property_id = p.id
			WHERE u.id != ${id}
			GROUP BY u.id, u.name
			HAVING SUM(
				CASE
					WHEN fp.is_satisfied IS up.is_satisfied THEN 0
					ELSE 1
				END
			) = 0;
		`,
		// comments
		sql`
			SELECT id, comment FROM functor_comments
			WHERE functor_id = ${id}
		`,
	])

	if (err) error(500, 'Could not load functor')

	const [
		functors,
		related_functors,
		tag_objects,
		properties_db,
		unknown_properties,
		undistinguishable_functors,
		comments,
	] = results

	if (!functors.length) error(404, `Could not find functor with ID '${id}'`)

	const functor = functors[0]
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
		functor,
		related_functors,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		undistinguishable_functors,
		comments,
	})
}
