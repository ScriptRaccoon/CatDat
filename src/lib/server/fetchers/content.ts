import type {
	ImplicationDB,
	ImplicationDisplay,
	PropertyShort,
	StructureShort,
	StructureShortDictionary,
	StructureType
} from '$lib/commons/types'
import { db } from '$lib/server/db'
import { display_implication } from '../transforms'

export function fetch_content_references(content_id: string) {
	const structures_via_proofs = db
		.prepare<[string], StructureShort & { type: StructureType }>(
			`SELECT DISTINCT s.id, s.name, s.type
	        FROM property_assignments pa
	        INNER JOIN structures s ON s.id = pa.structure_id
	        WHERE pa.proof LIKE '%/content/' || ? || '%'
			ORDER BY s.name`
		)
		.all(content_id)

	const structures_via_description = db
		.prepare<[string], StructureShort & { type: StructureType }>(
			`SELECT id, name, type FROM structures
            WHERE description LIKE '%/content/' || ? || '%'
			ORDER BY lower(id)`
		)
		.all(content_id)

	const structures = [...structures_via_proofs, ...structures_via_description]

	const structures_by_type: StructureShortDictionary = {}

	for (const { type, ...structure } of structures) {
		structures_by_type[type] ??= []
		if (structures_by_type[type].every((s) => s.id != structure.id)) {
			structures_by_type[type].push(structure)
		}
	}

	const properties = db
		.prepare<[string], PropertyShort & { type: StructureType }>(
			`SELECT id, relation, type FROM properties
            WHERE description LIKE '%/content/' || ? || '%'
			ORDER BY lower(id)`
		)
		.all(content_id)

	const properties_by_type: Partial<Record<StructureType, PropertyShort[]>> = {}

	for (const { type, ...property } of properties) {
		properties_by_type[type] ??= []
		properties_by_type[type].push(property)
	}

	const implications = db
		.prepare<[string], ImplicationDB & { type: StructureType }>(
			`SELECT
				id,
				type,
				is_equivalence,
				is_deduced,
				proof,
				assumptions,
				conclusions,
				associated_assumptions
			FROM implications_view
			WHERE proof LIKE '%/content/' || ? || '%'
			ORDER BY lower(assumptions) || ' ' || lower(conclusions)`
		)
		.all(content_id)

	const implications_by_type: Partial<Record<StructureType, ImplicationDisplay[]>> = {}

	for (const { type, ...rest } of implications) {
		implications_by_type[type] ??= []
		implications_by_type[type].push(display_implication(rest))
	}

	return { structures_by_type, properties_by_type, implications_by_type }
}
