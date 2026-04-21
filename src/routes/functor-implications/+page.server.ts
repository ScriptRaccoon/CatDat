import { render_nested_formulas } from '$lib/server/rendering'
import { query } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type { FunctorImplicationDB, FunctorImplicationDisplay } from '$lib/commons/types'
import { display_functor_implication } from '$lib/server/utils'

export const prerender = true

export const load = async () => {
	const { rows, err } = await query<FunctorImplicationDB>(sql`
        SELECT
            id,
            is_equivalence,
            reason,
            assumptions,
            conclusions,
            source_assumptions,
            target_assumptions
        FROM functor_implications_view
        ORDER BY lower(assumptions) || ' ' || lower(conclusions)
    `)

	if (err) error(500, 'Could not load implications')

	const implications: FunctorImplicationDisplay[] = rows.map(
		display_functor_implication,
	)

	return render_nested_formulas({ implications })
}
