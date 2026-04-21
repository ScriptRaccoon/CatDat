import type {
	FunctorDB,
	FunctorPropertyAssignment,
	FunctorPropertyAssignmentDB,
	FunctorPropertyShort,
} from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/rendering'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

// remove code duplication with category detail page

export const load = async (event) => {
	const id = event.params.id

	const { results, err } = await batch<
		[
			FunctorDB,
			FunctorPropertyAssignmentDB & { is_satisfied: number },
			FunctorPropertyShort,
		]
	>([
		sql`
            SELECT
                f.id,
				f.name,
				f.source,
				f.target,
				f.description,
				f.nlab_link,
                cs.name as source_name,
				ct.name as target_name
            FROM functors f
            INNER JOIN categories cs ON cs.id = f.source
            INNER JOIN categories ct ON ct.id = f.target
            WHERE f.id = ${id}
        `,
		// properties
		sql`
			SELECT
				fp.property_id AS id,
				fp.is_satisfied,
				fp.reason,
				fp.is_deduced,
				CASE
        			WHEN fp.is_satisfied = TRUE THEN p.relation
        			ELSE r.negation
    			END AS relation
			FROM functor_property_assignments fp
			INNER JOIN functor_properties p ON p.id = fp.property_id
			INNER JOIN relations r ON r.relation = p.relation
			WHERE fp.functor_id = ${id}
			ORDER BY fp.position, lower(fp.property_id)
		`,
		// unknown properties
		sql`
			SELECT
				p.id,
				p.relation
			FROM functor_properties p
			WHERE NOT EXISTS (
				SELECT 1 FROM functor_property_assignments
				WHERE functor_id = ${id} AND property_id = p.id
			)
			ORDER BY lower(p.id)
		`,
	])

	if (err) error(500, 'Could not load functor')

	const [functors, properties_db, unknown_properties] = results

	if (!functors.length) error(404, `Could not find functor with ID '${id}'`)

	const [functor] = functors

	const satisfied_properties: FunctorPropertyAssignment[] = properties_db
		.filter((obj) => obj.is_satisfied)
		.map((p) => ({
			id: p.id,
			reason: p.reason,
			is_deduced: Boolean(p.is_deduced),
			relation: p.relation,
		}))

	const unsatisfied_properties: FunctorPropertyAssignment[] = properties_db
		.filter((obj) => !obj.is_satisfied)
		.map((p) => ({
			id: p.id,
			reason: p.reason,
			is_deduced: Boolean(p.is_deduced),
			relation: p.relation,
		}))

	return render_nested_formulas({
		functor,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
	})
}
