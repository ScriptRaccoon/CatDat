import type { FunctorDB, PropertyAssignmentDB, PropertyShort } from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/formulas'
import { display_property_assignment } from '$lib/server/transforms'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

// TODO: remove code duplication with category detail page

export const load = async (event) => {
	const id = event.params.id

	const { results, err } = batch<[FunctorDB, PropertyAssignmentDB, PropertyShort]>([
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

	const satisfied_properties = properties_db
		.filter((obj) => obj.is_satisfied === 1)
		.map(display_property_assignment)

	const unsatisfied_properties = properties_db
		.filter((obj) => obj.is_satisfied === 0)
		.map(display_property_assignment)

	// TODO: also render undecidable properties in case they come up

	return render_nested_formulas({
		functor,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
	})
}
