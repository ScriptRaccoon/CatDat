import { type Database } from 'better-sqlite3'
import { get_categories } from './categories'
import { get_functors } from './functors'
import { StructureType } from '../config'

/**
 * A structure is a category or a functor.
 */
export type StructureMeta = {
	id: string
	name: string
	dual?: string | null
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>
}

export type PropertyMeta = {
	id: string
	dual: string | null
	relation: string
	conditional: string
}

/**
 * Returns the list of stored categorical structures of a given type.
 */
export function get_structures(db: Database, type: StructureType): StructureMeta[] {
	if (type === 'category') return get_categories(db)
	if (type === 'functor') return get_functors(db)
	throw new Error('Unsupported type')
}

/**
 * Returns a dictionary of properties saved in the database.
 */
export function get_properties_dict(db: Database, type: StructureType) {
	const properties = db
		.prepare<[StructureType], PropertyMeta>(
			`SELECT
				p.id, p.dual_property_id AS dual, p.relation,
				r.conditional
			FROM properties p
			INNER JOIN relations r ON r.relation = p.relation
			WHERE type = ?
			ORDER BY lower(p.id)`,
		)
		.all(type)

	const dict: Record<string, PropertyMeta> = {}

	for (const p of properties) dict[p.id] = p

	return dict
}

/**
 * Returns a dictionary with all assigned properties of a list of structures
 * (categories or functors), grouped by id and
 * value (satisfied / unsatisfied / undecidable).
 */
export function get_property_assignments(
	db: Database,
	structures: { id: string }[],
	type: StructureType,
) {
	const rows = db
		.prepare<
			[StructureType],
			{
				property_id: string
				structure_id: string
				is_satisfied: 0 | 1 | null
			}
		>(
			`SELECT
				property_id,
				structure_id,
				is_satisfied
			FROM property_assignments
			WHERE type = ?`,
		)
		.all(type)

	const grouped: Record<
		string,
		{ satisfied: Set<string>; unsatisfied: Set<string>; undecidable: Set<string> }
	> = {}

	for (const structure of structures) {
		grouped[structure.id] = {
			satisfied: new Set(),
			unsatisfied: new Set(),
			undecidable: new Set(),
		}
	}

	for (const row of rows) {
		const { property_id, structure_id, is_satisfied } = row
		let group_key: 'satisfied' | 'unsatisfied' | 'undecidable'
		if (is_satisfied === 1) {
			group_key = 'satisfied'
		} else if (is_satisfied === 0) {
			group_key = 'unsatisfied'
		} else {
			group_key = 'undecidable'
		}
		grouped[structure_id][group_key].add(property_id)
	}

	return grouped
}

/**
 * Returns a dictionary with all assigned properties of structures,
 * grouped by structure, value (satisfied / unsatisfied), and deduced status.
 * We exclude undecidable properties here.
 */
export function get_property_assignments_by_deduction(
	db: Database,
	structures: { id: string }[],
	type: StructureType,
) {
	const rows = db
		.prepare<
			[StructureType],
			{
				property_id: string
				structure_id: string
				is_satisfied: 0 | 1
				is_deduced: 0 | 1
			}
		>(
			`SELECT
				property_id,
				structure_id,
				is_satisfied,
				is_deduced
			FROM property_assignments
			WHERE type = ? AND is_satisfied IS NOT NULL`,
		)
		.all(type)

	const grouped: Record<
		string,
		{
			satisfied: { non_deduced: Set<string>; deduced: Set<string> }
			unsatisfied: { non_deduced: Set<string>; deduced: Set<string> }
		}
	> = {}

	for (const structure of structures) {
		grouped[structure.id] = {
			satisfied: { non_deduced: new Set(), deduced: new Set() },
			unsatisfied: { non_deduced: new Set(), deduced: new Set() },
		}
	}

	for (const row of rows) {
		const { property_id, structure_id, is_satisfied, is_deduced } = row
		grouped[structure_id][is_satisfied ? 'satisfied' : 'unsatisfied'][
			is_deduced ? 'deduced' : 'non_deduced'
		].add(property_id)
	}

	return grouped
}

/**
 * Checks if an structure is a dual, but not the
 * original structure to prevent circular reasoning.
 */
export function is_dual_structure(
	structure: StructureMeta,
): structure is StructureMeta & { dual: string } {
	return Boolean(structure.dual) && structure.name.toLowerCase().startsWith('dual')
}
