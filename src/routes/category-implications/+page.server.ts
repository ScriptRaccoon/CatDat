import { render_nested_formulas } from '$lib/server/rendering'
import { query } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type { ImplicationDB, ImplicationDisplay } from '$lib/commons/types'
import { display_implication } from '$lib/server/utils'

export const load = async () => {
	const { rows, err } = await query<ImplicationDB>(sql`
		SELECT
			id,
			is_equivalence,
			reason,
			assumptions,
			conclusions,
			is_deduced
		FROM category_implications_view
		ORDER BY lower(assumptions) || ' ' || lower(conclusions)
	`)

	if (err) error(500, 'Could not load implications')

	const implications: ImplicationDisplay[] = rows.map(display_implication)

	return render_nested_formulas({ implications })
}
