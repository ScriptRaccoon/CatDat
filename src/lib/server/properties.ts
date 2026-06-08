import type { StructureType } from '$lib/commons/types'
import { query } from './db.catdat'
import { error } from '@sveltejs/kit'

export function get_property_ids(type: StructureType) {
	const { rows, err } = query<{ id: string }>({
		sql: `SELECT id FROM ${type}_properties ORDER BY lower(id)`,
	})

	if (err) error(500, 'Failed to load properties')

	return rows.map(({ id }) => id)
}
