import type { PropertyShort, StructureShort, StructureType } from '$lib/commons/types'
import { db } from '$lib/server/db'

export function fetch_content_references(content_id: string) {
	const structures = db
		.prepare<[string], StructureShort & { type: StructureType }>(
			`SELECT DISTINCT s.id, s.name, s.type
	        FROM property_assignments pa
	        INNER JOIN structures s ON s.id = pa.structure_id
	        WHERE pa.proof LIKE '%/content/' || ? || '%'
			ORDER BY s.name`
		)
		.all(content_id)

	const structures_by_type: Partial<Record<StructureType, StructureShort[]>> = {}

	for (const { type, ...structure } of structures) {
		structures_by_type[type] ??= []
		structures_by_type[type].push(structure)
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
		.prepare<[string], { id: string; type: StructureType }>(
			`SELECT id, type FROM implications
            WHERE proof LIKE '%/content/' || ? || '%'`
		)
		.all(content_id)

	const implications_by_type: Partial<Record<StructureType, { id: string }[]>> = {}

	for (const { id, type } of implications) {
		implications_by_type[type] ??= []
		implications_by_type[type].push({ id })
	}

	return { structures_by_type, properties_by_type, implications_by_type }
}
