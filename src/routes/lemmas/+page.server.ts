import type { Lemma } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/rendering'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
	const { rows: lemmas, err } = query<Lemma>(
		sql`SELECT id, title, claim, proof FROM lemmas ORDER BY lower(title)`,
	)

	if (err) error(500, 'Could not load lemmas')

	return { lemmas }
}
