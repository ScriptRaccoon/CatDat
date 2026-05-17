import { render_nested_formulas } from '$lib/server/formulas'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type {
	FunctorImplicationDB,
	FunctorImplicationDisplay,
	FunctorShort,
} from '$lib/commons/types'
import { display_functor_implication } from '$lib/server/utils'

export const prerender = true

export const load = async (event) => {
	const id = event.params.id

	const { results, err } = batch<[FunctorImplicationDB, FunctorShort]>([
		sql`
            SELECT
                id,
                is_equivalence,
                reason,
                assumptions,
                conclusions,
                source_assumptions,
                target_assumptions,
                dualized_from
            FROM functor_implications_view
            WHERE id = ${id}
        `,
		sql`
            SELECT f.id, f.name FROM functors f
            WHERE EXISTS (
                SELECT 1 FROM functor_property_assignments fp
                WHERE fp.functor_id = f.id
                AND fp.reason LIKE '%/functor-implication/' || ${id} || '%'
            )
        `,
	])

	if (err) error(500, 'Could not load implication')

	const [implications, functors] = results

	if (!implications.length) error(404, `Could not find implication with ID '${id}'`)

	const implication: FunctorImplicationDisplay = display_functor_implication(
		implications[0],
	)

	return render_nested_formulas({ implication, functors })
}
