import type { StructureType } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'

export function fetch_structure_tags() {
	const { rows, err } = query<{ tag: string; type: StructureType }>(sql`
		SELECT tag, type FROM structure_tags
	`)

	if (err) throw new Error('Database error: Failed to load structure tags')

	return rows
}

export function fetch_property_tags() {
	const { rows, err } = query<{ tag: string; type: StructureType }>(sql`
		SELECT tag, type FROM property_tags
	`)

	if (err) throw new Error('Database error: Failed to load property tags')

	return rows
}
