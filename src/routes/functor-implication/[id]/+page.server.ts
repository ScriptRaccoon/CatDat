import { render_nested_formulas } from '$lib/server/rendering'
import { query } from '$lib/server/db'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type { FunctorImplicationDB, FunctorImplicationDisplay } from '$lib/commons/types'
import { display_functor_implication } from '$lib/server/utils'

export const prerender = true

export const load = async (event) => {
	const id = event.params.id

	const { rows, err } = await query<FunctorImplicationDB>(sql`
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
    `)

	if (err) error(500, 'Could not load implication')

	if (!rows.length) error(404, `Could not find implication with ID '${id}'`)

	const implication: FunctorImplicationDisplay = display_functor_implication(rows[0])

	return render_nested_formulas({ implication })
}
