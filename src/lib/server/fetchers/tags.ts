import type { StructureType, TagObject } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '../db.catdat'

export function fetch_tags(type: StructureType) {
	const { rows, err } = query<TagObject>(sql`SELECT tag FROM tags WHERE type = ${type}`)

	if (err) throw new Error('Database error: Failed to load tags')

	return rows
}
