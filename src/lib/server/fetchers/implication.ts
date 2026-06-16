import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type {
	ImplicationDB,
	MappedTypes,
	StructureShort,
	StructureType,
} from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'

export function fetch_implication(type: StructureType, id: string) {
	const { results, err } = batch<
		[ImplicationDB, StructureShort, { map: string; mapped_type: StructureType }]
	>([
		sql`
            SELECT
                id,
                is_equivalence,
                is_deduced,
                dualized_from,
                proof,
                assumptions,
                conclusions,
                mapped_assumptions
            FROM implications_view
            WHERE id = ${id}
        `,
		sql`
            SELECT DISTINCT s.id, s.name
            FROM property_assignments pa
            INNER JOIN structures s ON s.id = pa.structure_id
            WHERE
                pa.type = ${type}
                AND pa.proof LIKE '%/' || ${type} || '-implication/' || ${id} || '%'
        `,
		sql`
            SELECT map, mapped_type
            FROM structure_maps
            WHERE type = ${type}
        `,
	])

	if (err) error(500, 'Could not load implication')

	const [implications, structures, structure_maps] = results

	if (!implications.length) {
		error(404, `Could not find implication with ID '${id}'`)
	}

	const implication = display_implication(implications[0])

	const mapped_types: MappedTypes = {}

	for (const { map, mapped_type } of structure_maps) {
		mapped_types[map] = mapped_type
	}

	return { implication, structures, mapped_types }
}
