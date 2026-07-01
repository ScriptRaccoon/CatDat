import type { StructureType, TagObject } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'

export function fetch_structure_tags(type: StructureType) {
	const { rows, err } = query<TagObject>(sql`
		SELECT tag FROM structure_tags WHERE type = ${type}
	`)

	if (err) throw new Error('Database error: Failed to load structure tags')

	return rows
}

export function fetch_property_tags(type: StructureType) {
	const { rows, err } = query<TagObject>(sql`
		SELECT tag FROM property_tags WHERE type = ${type}
	`)

	if (err) throw new Error('Database error: Failed to load property tags')

	return rows
}
