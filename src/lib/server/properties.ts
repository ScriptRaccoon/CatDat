import type { StructureType } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from './db.catdat'
import { error } from '@sveltejs/kit'

export function get_property_ids(type: StructureType) {
	const { rows, err } = query<{ id: string }>(
		sql`
			SELECT id FROM properties WHERE type = ${type} ORDER BY lower(id)
		`,
	)

	if (err) error(500, 'Failed to load properties')

	return rows.map(({ id }) => id)
}
