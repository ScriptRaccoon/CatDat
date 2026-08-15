import { type Database } from 'better-sqlite3'
import { type StructureType } from '$shared/config'

/**
 * Type for various types of categorical structures (category, functor, ...)
 */
export type StructureMeta = {
	id: string
	name: string
	dual?: string | null
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
}

/**
 * Returns the list of stored categorical structures of a given type.
 * For structures with structure maps (e.g. functors), the associated
 * satisfied properties are retrieved as well.
 */
export function get_structures(db: Database, type: StructureType): StructureMeta[] {
	const structures_raw = db
		.prepare<
			[StructureType],
			{
				id: string
				name: string
				dual: string | null
				properties: string
			}
		>(
			`
			SELECT
				id, name, dual,
				json_group_object(label, props) AS properties
			FROM (
				SELECT
					s.id,
					s.name,
					s.dual_structure_id AS dual,
					m.label,
					json_group_array(a.property_id) AS props
				FROM structures s
				LEFT JOIN associated_structures m
					ON m.structure_id = s.id
				LEFT JOIN property_assignments a
					ON a.structure_id = m.associated_structure_id
					AND a.is_satisfied = TRUE
				WHERE s.type = ?
				GROUP BY s.id, m.label
			)
			GROUP BY id
			ORDER BY id`
		)
		.all(type)

	return structures_raw.map((s) => {
		const { id, name, dual, properties } = s
		const parsed_properties = JSON.parse(properties) as Partial<
			Record<string, string>
		>

		const associated_satisfied_properties: Partial<Record<string, Set<string>>> = {}
		for (const [map, props] of Object.entries(parsed_properties)) {
			if (!props) continue
			associated_satisfied_properties[map] = new Set(JSON.parse(props))
		}

		return { id, name, dual, associated_satisfied_properties }
	})
}

/**
 * Checks if a structure is a dual, but not the
 * original structure to prevent circular reasoning.
 */
export function is_dual_structure(
	structure: StructureMeta
): structure is StructureMeta & { dual: string } {
	return Boolean(structure.dual) && structure.name.toLowerCase().startsWith('dual')
}

/**
 * Returns a map that assigns to each structure its parent, if present.
 */
export function get_structure_parent_map(db: Database, type: StructureType) {
	const structures = db
		.prepare<
			[StructureType],
			{ id: string; parent: string | null }
		>(`SELECT id, parent FROM structures WHERE type = ?`)
		.all(type)

	return new Map(structures.map((structure) => [structure.id, structure.parent]))
}
