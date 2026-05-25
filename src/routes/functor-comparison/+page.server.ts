import type { StructureShort } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'

export const load = async () => {
	const { rows: functors, err } = query<StructureShort>(sql`
		SELECT id, name FROM functors ORDER BY lower(name)
	`)

	if (err) error(500, 'Functors could not be loaded')

	return { functors }
}
