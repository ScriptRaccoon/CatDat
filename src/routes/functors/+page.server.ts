import type { FunctorShort } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const prerender = true

export const load = async () => {
	const { rows: functors, err } = await query<FunctorShort>(
		sql`SELECT id, name FROM functors ORDER BY lower(name)`,
	)

	if (err) error(500, 'Functors could not be loaded')

	return { functors }
}
