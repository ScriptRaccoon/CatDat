import type { ImplicationDB, ImplicationDisplay } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/rendering'
import { display_implication } from '$lib/server/utils'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
	const id = event.params.id

	const { rows, err } = await query<ImplicationDB>(sql`
		SELECT
			id,
			is_equivalence,
			reason,
			assumptions,
			conclusions,
			is_deduced,
            dualized_from
		FROM implications_view
        WHERE id = ${id}
	`)

	if (err) error(500, 'Could not load implication')

	if (!rows.length) error(404, `Could not find implication with ID '${id}'`)

	const implication: ImplicationDisplay = display_implication(rows[0])

	return render_nested_formulas({ implication })
}
