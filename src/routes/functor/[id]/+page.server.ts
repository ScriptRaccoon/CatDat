import type { FunctorSpecificDisplay, RelatedStructure } from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { fetch_structure } from '$lib/server/fetchers/structure'
import { render_nested_formulas } from '$lib/server/formulas'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
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
	} = fetch_structure('functor', id)

	const { results, err } = batch<
		[FunctorSpecificDisplay, RelatedStructure, RelatedStructure]
	>([
		// specific information for the functor
		sql`
            SELECT
				f.source,
				f.target,
                source.name AS source_name,
				source.notation AS source_notation,
				target.name AS target_name,
				target.notation AS target_notation
            FROM functors f
            INNER JOIN structures AS source ON source.id = f.source
            INNER JOIN structures AS target ON target.id = f.target
            WHERE f.id = ${id}
        `,
		// left adjoint functor
		sql`
			SELECT f.id, f.name, f.notation
			FROM adjoint_functors a
			INNER JOIN structures f ON f.id = a.left_adjoint
			WHERE a.right_adjoint = ${id}
		`,
		// right adjoint functor
		sql`
			SELECT f.id, f.name, f.notation
			FROM adjoint_functors a
			INNER JOIN structures f ON f.id = a.right_adjoint
			WHERE a.left_adjoint = ${id}
		`,
	])

	if (err) error(500, 'Could not load functor')

	const [functors, left_adjoints, right_adjoints] = results

	if (!functors.length) error(404, `Could not find functor with ID '${id}'`)

	const functor = {
		...functors[0],
		left_adjoint: left_adjoints.at(0),
		right_adjoint: right_adjoints.at(0),
	}

	return render_nested_formulas({
		structure,
		functor,
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
