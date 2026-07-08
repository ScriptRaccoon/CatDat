import { capitalize } from '$lib/client/utils'
import { PLURALS } from '$lib/commons/structures'
import type { StructureShort, StructureType, TagObject } from '$lib/commons/types'
import { batch, query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export function fetch_structures(type: StructureType) {
	const { rows: structures, err } = query<StructureShort>(sql`
        SELECT id, name
        FROM structures
        WHERE type = ${type}
        ORDER BY lower(name)
    `)

	if (err) error(500, `${capitalize(PLURALS[type])} could not be loaded`)

	return { structures, type }
}

export function fetch_structures_and_tags(type: StructureType) {
	const { results, err } = batch<[StructureShort, TagObject]>([
		sql`
            SELECT id, name
            FROM structures
            WHERE type = ${type}
            ORDER BY lower(name)`,
		sql`
            SELECT t.tag
            FROM structure_tags t
            WHERE t.type = ${type}
            AND EXISTS (
                SELECT 1 FROM structure_tag_assignments a
                WHERE a.tag = t.tag AND a.type = ${type}
            )
            ORDER BY t.id
        `
	])

	if (err) error(500, `${capitalize(PLURALS[type])} could not be loaded`)

	const [structures, tag_objects] = results

	const tags = tag_objects.map(({ tag }) => tag)

	return { type, structures, tags }
}

export function fetch_tagged_structures(type: StructureType, tag: string) {
	const { rows: structures, err } = query<StructureShort>(sql`
        SELECT s.id, s.name
        FROM structure_tag_assignments t
        INNER JOIN structures s
        ON s.id = t.structure_id
        WHERE t.tag = ${tag} AND t.type = ${type}
        ORDER BY lower(name)
    `)

	if (err) error(500, `${capitalize(PLURALS[type])} could not be loaded`)

	return { type, structures, tag }
}
