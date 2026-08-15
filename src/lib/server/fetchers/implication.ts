import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type {
	ImplicationDB,
	AssociatedTypes,
	StructureShort,
	StructureType
} from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'
import { fetch_property_relation_dict } from './properties'

export function fetch_implication(type: StructureType, id: string) {
	const property_relation_dict = fetch_property_relation_dict()

	const implication_db = db
		.prepare<[string], ImplicationDB>(
			`SELECT
                id,
                is_equivalence,
                is_deduced,
                proof,
                assumptions,
                conclusions,
                associated_assumptions
            FROM implications_view
            WHERE id = ?`
		)
		.get(id)

	if (!implication_db) {
		error(404, `Could not find implication with ID '${id}'`)
	}

	const implication = display_implication(implication_db)

	const structures = db
		.prepare<[StructureType, string], StructureShort>(
			`SELECT DISTINCT s.id, s.name
            FROM property_assignments pa
            INNER JOIN structures s ON s.id = pa.structure_id
            WHERE pa.type = ?
            AND pa.proof LIKE '%/' || pa.type || '-implication/' || ? || '%'`
		)
		.all(type, id)

	const associated_structure_types = db
		.prepare<[StructureType], { label: string; associated_type: StructureType }>(
			`SELECT label, associated_type
            FROM associated_structure_types
            WHERE type = ?`
		)
		.all(type)

	const associated_types: AssociatedTypes = {}

	for (const { label, associated_type } of associated_structure_types) {
		associated_types[label] = associated_type
	}

	return { type, implication, property_relation_dict, structures, associated_types }
}
