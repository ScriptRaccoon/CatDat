import type { StructureShort, StructureType } from '$lib/commons/types'
import { db } from '$lib/server/db'

export function fetch_structures(type: StructureType) {
	const structures = db
		.prepare<[StructureType], StructureShort>(
			`SELECT id, name
            FROM structures
            WHERE type = ?
            ORDER BY lower(name)`
		)
		.all(type)

	return { structures, type }
}

export function fetch_structures_and_tags(type: StructureType) {
	const structures = db
		.prepare<[StructureType], StructureShort>(
			`SELECT id, name
            FROM structures
            WHERE type = ?
            ORDER BY lower(name)`
		)
		.all(type)

	const tags = db
		.prepare<[StructureType], string>(
			`SELECT t.tag
            FROM structure_tags t
            WHERE t.type = ?
            AND EXISTS (
                SELECT 1 FROM structure_tag_assignments a
                WHERE a.tag = t.tag AND a.type = t.type
            )
            ORDER BY t.id`
		)
		.pluck()
		.all(type)

	return { type, structures, tags }
}

export function fetch_tagged_structures(type: StructureType, tag: string) {
	const structures = db
		.prepare<[StructureType, string], StructureShort>(
			`SELECT s.id, s.name
            FROM structure_tag_assignments t
            INNER JOIN structures s
            ON s.id = t.structure_id
            WHERE t.type = ? AND t.tag = ?
            ORDER BY lower(name)`
		)
		.all(type, tag)

	return { type, structures, tag }
}
