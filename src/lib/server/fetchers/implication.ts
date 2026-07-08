import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type {
	ImplicationDB,
	MappedTypes,
	StructureShort,
	StructureType
} from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'

export function fetch_implication(type: StructureType, id: string) {
	const implication_db = db
		.prepare<[string], ImplicationDB>(
			`SELECT
                id,
                is_equivalence,
                is_deduced,
                dualized_from,
                proof,
                assumptions,
                conclusions,
                mapped_assumptions
            FROM implications_view
            WHERE id = ?`
		)
		.get(id)

	const structures = db
		.prepare<[StructureType, string], StructureShort>(
			`SELECT DISTINCT s.id, s.name
            FROM property_assignments pa
            INNER JOIN structures s ON s.id = pa.structure_id
            WHERE pa.type = ?
            AND pa.proof LIKE '%/' || pa.type || '-implication/' || ? || '%'`
		)
		.all(type, id)

	const structure_maps = db
		.prepare<[StructureType], { map: string; mapped_type: StructureType }>(
			`SELECT map, mapped_type
            FROM structure_maps
            WHERE type = ?`
		)
		.all(type)

	if (!implication_db) {
		error(404, `Could not find implication with ID '${id}'`)
	}

	const implication = display_implication(implication_db)

	const mapped_types: MappedTypes = {}

	for (const { map, mapped_type } of structure_maps) {
		mapped_types[map] = mapped_type
	}

	return { type, implication, structures, mapped_types }
}
