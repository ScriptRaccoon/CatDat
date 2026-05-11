import type { Lemma } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async () => {
	const { rows: lemmas, err } = query<Lemma>(
		sql`SELECT id, title, claim, proof FROM lemmas ORDER BY lower(title)`,
	)

	if (err) error(500, 'Could not load lemmas')

	return { lemmas }
}
