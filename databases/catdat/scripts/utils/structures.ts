import { type Database } from 'better-sqlite3'
import { StructureType, TABLES } from '../config'

/**
 * Type for various types of categorical structures (category, functor, ...)
 */
export type StructureMeta = {
	id: string
	name: string
	dual?: string | null
	associated_satisfied_properties?: Record<string, Set<string>>
}

/**
 * Returns the list of stored categorical structures of a given type.
 * For structures with structure maps (e.g. functors), the associated
 * satisfied properties are retrieved as well.
 */
export function get_structures(db: Database, type: StructureType): StructureMeta[] {
	const structures = db
		.prepare<[StructureType], StructureMeta>(
			`SELECT
                s.id,
                s.name,
                s.dual_structure_id AS dual
            FROM structures s
			WHERE s.type = ?
            ORDER BY lower(s.name)`,
		)
		.all(type)

	const structure_maps = db
		.prepare<[StructureType], string>(`SELECT map FROM structure_maps WHERE type = ?`)
		.pluck()
		.all(type)

	if (!structure_maps.length) return structures

	const add_associated_properties = db.transaction(() => {
		for (const map of structure_maps) {
			const prop_query = db
				.prepare<[string], string>(
					`SELECT property_id FROM property_assignments
					INNER JOIN ${TABLES[type]} t ON t.id = ?
					WHERE structure_id = t.${map}
					AND is_satisfied = TRUE`,
				)
				.pluck()

			for (const structure of structures) {
				structure.associated_satisfied_properties ??= {}
				const props = prop_query.all(structure.id)
				structure.associated_satisfied_properties[map] = new Set(props)
			}
		}
	})

	add_associated_properties()

	return structures
}

/**
 * Checks if a structure is a dual, but not the
 * original structure to prevent circular reasoning.
 */
export function is_dual_structure(
	structure: StructureMeta,
): structure is StructureMeta & { dual: string } {
	return Boolean(structure.dual) && structure.name.toLowerCase().startsWith('dual')
}
