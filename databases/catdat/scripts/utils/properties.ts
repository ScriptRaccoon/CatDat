import { type Database } from 'better-sqlite3'
import type { StructureType } from '../config'

/**
 * Property of a categorical structure
 */
export type PropertyMeta = {
	id: string
	dual: string | null
	relation: string // e.g. "is"
	conditional_relation: string // e.g. "would be"
}

/**
 * Returns a dictionary of properties saved in the database.
 */
export function get_properties_dict(db: Database, type: StructureType) {
	const properties = db
		.prepare<[StructureType], PropertyMeta>(
			`SELECT
				p.id,
				p.dual_property_id AS dual,
				p.relation,
				r.conditional AS conditional_relation
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
	const assignments = db
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

	const dict = Object.fromEntries(
		structures.map((s) => [
			s.id,
			{
				satisfied: new Set<string>(),
				unsatisfied: new Set<string>(),
				undecidable: new Set<string>(),
			},
		]),
	)

	for (const assignment of assignments) {
		const { property_id, structure_id, is_satisfied } = assignment
		const key = get_assignment_key(is_satisfied)
		dict[structure_id][key].add(property_id)
	}

	return dict
}

/**
 * Returns the key in the assignment dictionary
 */
function get_assignment_key(is_satisfied: 0 | 1 | null) {
	if (is_satisfied === 1) {
		return 'satisfied'
	} else if (is_satisfied === 0) {
		return 'unsatisfied'
	} else {
		return 'undecidable'
	}
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
	const assignments = db
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
			WHERE
				type = ?
				AND is_satisfied IS NOT NULL`,
		)
		.all(type)

	const dict = Object.fromEntries(
		structures.map((s) => [
			s.id,
			{
				satisfied: {
					non_deduced: new Set<string>(),
					deduced: new Set<string>(),
				},
				unsatisfied: {
					non_deduced: new Set<string>(),
					deduced: new Set<string>(),
				},
			},
		]),
	)

	for (const assignment of assignments) {
		const { property_id, structure_id, is_satisfied, is_deduced } = assignment
		const value_key = is_satisfied ? 'satisfied' : 'unsatisfied'
		const status_key = is_deduced ? 'deduced' : 'non_deduced'
		dict[structure_id][value_key][status_key].add(property_id)
	}

	return dict
}
