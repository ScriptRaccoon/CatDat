import { type Database } from 'better-sqlite3'
import { type StructureType } from '#shared/config.ts'

/**
 * Reference to a structure, e.g. the domain of a functor
 */
export type StructureRef = {
	id: string
	type: StructureType
}

/**
 * Type for various types of categorical structures (category, functor, ...)
 */
export type StructureMeta = {
	id: string
	name: string
	dual?: string | null
	associated_structures?: Partial<Record<string, StructureRef>>
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
}

/**
 * Returns the list of stored categorical structures of a given type.
 * For structures with associated structures (e.g. the domain of a functor),
 * the associated structures and their satisfied properties are retrieved
 * as well.
 */
export function get_structures(db: Database, type: StructureType): StructureMeta[] {
	const structures_raw = db
		.prepare<
			[StructureType],
			{
				id: string
				name: string
				dual: string | null
				associated_structures_json: string
				associated_satisfied_properties_json: string
			}
		>(
			`
			SELECT
				id, name, dual,
				json_group_object(
					label,
					json_object('id', associated_id, 'type', associated_type)
				) AS associated_structures_json,
				json_group_object(label, props) AS associated_satisfied_properties_json
			FROM (
				SELECT
					s.id,
					s.name,
					s.dual_structure_id AS dual,
					ass.label,
					ass.target_structure_id AS associated_id,
					ass.target_type AS associated_type,
					json_group_array(pa.property_id) AS props
				FROM structures s
				LEFT JOIN associated_structures ass
					ON ass.source_structure_id = s.id
				LEFT JOIN property_assignments pa
					ON pa.structure_id = ass.target_structure_id
					AND pa.is_satisfied = TRUE
				WHERE s.type = ?
				GROUP BY s.id, ass.label
			)
			GROUP BY id
			ORDER BY id`
		)
		.all(type)

	return structures_raw.map((s) => {
		const {
			id,
			name,
			dual,
			associated_structures_json,
			associated_satisfied_properties_json
		} = s

		const parsed_associated_structures = JSON.parse(
			associated_structures_json
		) as Partial<Record<string, { id: string | null; type: StructureType | null }>>

		const associated_structures: Partial<Record<string, StructureRef>> = {}
		for (const [label, associated] of Object.entries(parsed_associated_structures)) {
			if (!associated?.id || !associated.type) continue
			associated_structures[label] = { id: associated.id, type: associated.type }
		}

		const parsed_associated_satisfied_properties = JSON.parse(
			associated_satisfied_properties_json
		) as Partial<Record<string, string>>

		const associated_satisfied_properties: Partial<Record<string, Set<string>>> = {}
		for (const [label, props] of Object.entries(
			parsed_associated_satisfied_properties
		)) {
			if (!props) continue
			associated_satisfied_properties[label] = new Set(JSON.parse(props))
		}

		return { id, name, dual, associated_structures, associated_satisfied_properties }
	})
}

/**
 * Checks if a structure is the dual of another structure, the original.
 * Its ID is the ID of the original followed by "_op" (checked in db:test).
 * Properties are only dualized from the original to its dual,
 * which prevents circular reasoning.
 */
export function is_dual_structure(
	structure: StructureMeta
): structure is StructureMeta & { dual: string } {
	return Boolean(structure.dual) && structure.id === `${structure.dual}_op`
}

/**
 * Returns a map that assigns to each structure its parent, if present.
 */
export function get_structure_parent_map(db: Database, type: StructureType) {
	const structures = db
		.prepare<[StructureType], { id: string; parent_structure_id: string | null }>(
			`SELECT id, parent_structure_id
			FROM structures WHERE type = ?`
		)
		.all(type)

	return new Map(
		structures.map((structure) => [structure.id, structure.parent_structure_id])
	)
}
