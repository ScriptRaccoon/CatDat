import { render_nested_formulas } from '$lib/server/formulas'
import { query } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type { ImplicationDB } from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'

export const load = () => {
	const { rows, err } = query<ImplicationDB>(sql`
        SELECT
            id,
            is_equivalence,
            is_deduced,
            dualized_from,
            proof,
            assumptions,
            source_assumptions,
            target_assumptions,
            conclusions
        FROM implications_view
        WHERE type = 'functor'
        ORDER BY lower(assumptions) || ' ' || lower(conclusions)
    `)

	if (err) error(500, 'Could not load implications')

	const implications = rows.map(display_implication)

	return render_nested_formulas({ implications })
}
