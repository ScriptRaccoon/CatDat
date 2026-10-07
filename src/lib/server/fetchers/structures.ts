import type { StructureShort, StructureType } from '#lib/commons/types.ts'
import { db } from '#lib/server/db.ts'

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

export function fetch_structures_with_tags_and_keywords(type: StructureType) {
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

	const keywords_db = db
		.prepare<[StructureType], { structure_id: string; keyword: string }>(
			`SELECT k.structure_id, k.keyword
            FROM structure_keywords k
            INNER JOIN structures s
            ON s.id = k.structure_id
            WHERE s.type = ?`
		)
		.all(type)

	const keywords: Record<string, string[]> = {}

	for (const { structure_id, keyword } of keywords_db) {
		keywords[structure_id] ??= []
		keywords[structure_id].push(keyword)
	}

	return { type, structures, tags, keywords }
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
