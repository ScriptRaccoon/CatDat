import type { Lemma } from '$lib/commons/types'
import { query } from '$lib/server/db'
import { render_nested_formulas } from '$lib/server/rendering'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
	const id = event.params.id

	const { rows: lemmas, err } = await query<Lemma>(sql`
        SELECT title, claim, proof FROM lemmas WHERE id = ${id}
    `)

	if (err) error(500, 'Could not load lemma')

	if (!lemmas.length) error(404, 'Lemma not found')

	const lemma = lemmas[0]

	return render_nested_formulas({ lemma })
}
