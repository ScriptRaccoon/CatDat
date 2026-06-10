/**
 * This file contains all functions that are used to deduce properties
 * for categories and functors.
 */

import { type Database, SqliteError } from 'better-sqlite3'
import { get_client, is_subset } from './utils/helpers'
import {
	get_structures,
	get_normalized_implications,
	get_properties_dict,
	get_property_assignments,
	is_dual_structure,
	type StructureMeta,
	type NormalizedImplication,
	type PropertyMeta,
} from './utils/deduction'
import { get_contradiction_string, get_proof_string } from './utils/implications'
import type { StructureType } from './config'

/**
 * Returns the set of satisfied properties that can be deduced from a set
 * of satisfied properties, based on a list of normalized implications. If a
 * property dictionary is provided, human-readable proofs are generated as well.
 */
export function get_deduced_satisfied_properties(
	satisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	options: {
		properties_dict?: Record<string, PropertyMeta>
		stop_when_found?: string
	},
	type: StructureType,
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>,
) {
	const found = new Set<string>()
	const proofs: Record<string, string> = {}
	const deduced_satisfied_properties = new Set(satisfied_properties)

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			const is_valid =
				is_subset(implication.assumptions, deduced_satisfied_properties) &&
				!deduced_satisfied_properties.has(implication.conclusion) &&
				!newly_found.has(implication.conclusion)

			if (!is_valid) continue

			if (implication.associated_assumptions) {
				const is_applicable = Object.keys(
					implication.associated_assumptions,
				).every((key) => {
					return is_subset(
						implication.associated_assumptions?.[key] ?? new Set(),
						associated_satisfied_properties?.[key] ?? new Set(),
					)
				})
				if (!is_applicable) continue
			}

			newly_found.add(implication.conclusion)
			found.add(implication.conclusion)

			if (options?.stop_when_found === implication.conclusion) {
				deduced_satisfied_properties.add(implication.conclusion)
				return { deduced_satisfied_properties, found, proofs }
			}

			if (options.properties_dict) {
				proofs[implication.conclusion] = get_proof_string(
					implication,
					options.properties_dict,
					type,
				)
			}
		}

		for (const p of newly_found) deduced_satisfied_properties.add(p)

		if (!newly_found.size) break
	}

	return { deduced_satisfied_properties, found, proofs }
}

/**
 * Returns the set of unsatisfied properties that can be deduced from
 * a set of satisfied properties and a set of unsatisfied properties,
 * based on a list of normalized implications. If a property dictionary
 * is provided, human-readable proofs are generated as well.
 */
export function get_deduced_unsatisfied_properties(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	options: {
		properties_dict?: Record<string, PropertyMeta>
		stop_when_found?: string
	},
	type: StructureType,
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>,
) {
	const found = new Set<string>()
	const proofs: Record<string, string> = {}
	const deduced_unsatisfied_properties = new Set(unsatisfied_properties)

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			if (!deduced_unsatisfied_properties.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!deduced_unsatisfied_properties.has(p) &&
					!newly_found.has(p) &&
					is_subset(implication.assumptions, satisfied_properties, {
						exception: p,
					})
				if (!is_valid) continue

				if (implication.associated_assumptions) {
					const is_applicable = Object.keys(
						implication.associated_assumptions,
					).every((key) => {
						return is_subset(
							implication.associated_assumptions?.[key] ?? new Set(),
							associated_satisfied_properties?.[key] ?? new Set(),
						)
					})
					if (!is_applicable) continue
				}

				if (satisfied_properties.has(p)) {
					throw new Error(`Contradiction has been found for: ${p}`)
				}

				if (options?.stop_when_found === p) {
					deduced_unsatisfied_properties.add(p)
					return { deduced_unsatisfied_properties, found, proofs }
				}

				newly_found.add(p)
				found.add(p)

				if (options.properties_dict) {
					proofs[p] = get_contradiction_string(
						implication,
						options.properties_dict,
						p,
						type,
					)
				}
			}
		}

		for (const p of newly_found) deduced_unsatisfied_properties.add(p)

		if (!newly_found.size) break
	}

	return { deduced_unsatisfied_properties, found, proofs }
}

/**
 * Saves the deduced satisfied properties to the database
 */
function save_satisfied_properties(
	db: Database,
	structure_id: string,
	found: Set<string>,
	proofs: Record<string, string>,
	type: StructureType,
) {
	if (found.size === 0) return

	const err_msg = `❌ Failed to complete deduction of satisfied properties for ${structure_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`

	const property_insert = db.prepare(`
		INSERT INTO property_assignments
			(structure_id, property_id, type, is_satisfied, proof, is_deduced)
		VALUES (?, ?, ?, TRUE, ?, TRUE)
	`)

	try {
		for (const p of found) {
			property_insert.run(structure_id, p, type, proofs[p])
		}
	} catch (err) {
		if (err instanceof SqliteError) {
			if (err.code.startsWith('SQLITE_CONSTRAINT')) {
				console.error(err_msg)
			}
			console.error(err.message)
		} else {
			console.error(err)
		}
		process.exit(1)
	}
}

/**
 * Saves the deduced unsatisfied properties to the database
 */
function save_unsatisfied_properties(
	db: Database,
	structure_id: string,
	found: Set<string>,
	proofs: Record<string, string>,
	type: StructureType,
) {
	if (found.size === 0) return

	const err_msg = `❌ Failed to complete deduction of unsatisfied properties for ${structure_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`

	const property_insert = db.prepare(`
		INSERT INTO property_assignments
			(structure_id, property_id, type, is_satisfied, proof, is_deduced)
		VALUES (?, ?, ?, FALSE, ?, TRUE)
	`)

	try {
		for (const p of found) {
			property_insert.run(structure_id, p, type, proofs[p])
		}
	} catch (err) {
		if (err instanceof SqliteError) {
			if (err.code.startsWith('SQLITE_CONSTRAINT')) {
				console.error(err_msg)
			}
			console.error(err.message)
		} else {
			console.error(err)
		}
		process.exit(1)
	}
}

/**
 * Deduce satisfied properties for a given structure from given ones
 * by using the list of normalized implications.
 * Warning: This mutates the set of satisfied properties.
 */
function deduce_satisfied_properties(
	db: Database,
	structure: StructureMeta,
	implications: NormalizedImplication[],
	satisfied_properties: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: StructureType,
) {
	const { found, proofs } = get_deduced_satisfied_properties(
		satisfied_properties,
		implications,
		{ properties_dict },
		type,
		structure.associated_satisfied_properties,
	)

	for (const p of found) satisfied_properties.add(p)

	save_satisfied_properties(db, structure.id, found, proofs, type)

	console.info(`Deduced ${found.size} satisfied properties for ${structure.id}`)
}

/**
 * Deduce unsatisfied properties for a given structure from given ones
 * by using the satisfied properties and the list of normalized implications.
 * Warning: This mutates the set of unsatisfied properties.
 */
function deduce_unsatisfied_properties(
	db: Database,
	structure: StructureMeta,
	implications: NormalizedImplication[],
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: StructureType,
) {
	const { found, proofs } = get_deduced_unsatisfied_properties(
		satisfied_properties,
		unsatisfied_properties,
		implications,
		{ properties_dict },
		type,
		structure.associated_satisfied_properties,
	)

	for (const p of found) unsatisfied_properties.add(p)

	save_unsatisfied_properties(db, structure.id, found, proofs, type)

	console.info(`Deduced ${found.size} unsatisfied properties for ${structure.id}`)
}

/**
 * Assign dual properties to dual structures:
 * If C has property P, then C^op has property P^op (if defined).
 * Warning: This mutates the sets of assigned properties.
 */
function deduce_dual_properties(
	db: Database,
	structure: StructureMeta & { dual: string },
	satisfied: Set<string>,
	unsatisfied: Set<string>,
	undecidable: Set<string>,
	dual_satisfied: Set<string>,
	dual_unsatisfied: Set<string>,
	dual_undecidable: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: 'category',
) {
	const new_satisfied = new Set<string>()

	for (const p of dual_satisfied) {
		const p_dual = properties_dict[p].dual
		if (!p_dual || satisfied.has(p_dual)) continue
		new_satisfied.add(p_dual)
		satisfied.add(p_dual)
	}

	const new_unsatisfied = new Set<string>()

	for (const p of dual_unsatisfied) {
		const p_dual = properties_dict[p].dual
		if (!p_dual || unsatisfied.has(p_dual)) continue
		new_unsatisfied.add(p_dual)
		unsatisfied.add(p_dual)
	}

	const new_undecidable = new Set<string>()

	for (const p of dual_undecidable) {
		const p_dual = properties_dict[p].dual
		if (!p_dual || undecidable.has(p_dual)) continue
		new_undecidable.add(p_dual)
		undecidable.add(p_dual)
	}

	const property_insert = db.prepare(`
		INSERT INTO property_assignments
			(structure_id, property_id, type, is_satisfied, proof, is_deduced)
		VALUES (?, ?, ?, ?, ?, TRUE)
	`)

	const proof_satisfied = `Its dual ${type} satisfies the dual property.`
	const proof_unsatisfied = `Its dual ${type} does not satisfy the dual property.`
	const proof_undecidable = `The dual property is undecidable for its dual ${type}.`

	for (const p of new_satisfied) {
		property_insert.run(structure.id, p, type, 1, proof_satisfied)
	}

	console.info(
		`Deduced ${new_satisfied.size} satisfied properties by duality for ${structure.id}`,
	)

	for (const q of new_unsatisfied) {
		property_insert.run(structure.id, q, type, 0, proof_unsatisfied)
	}

	console.info(
		`Deduced ${new_unsatisfied.size} unsatisfied properties by duality for ${structure.id}`,
	)

	for (const q of new_undecidable) {
		property_insert.run(structure.id, q, type, null, proof_undecidable)
	}

	console.info(
		`Deduced ${new_undecidable.size} undecidable properties by duality for ${structure.id}`,
	)
}

/**
 * Clears all the deduced properties. This runs before the deduction starts.
 */
function delete_deduced_properties(db: Database, type: StructureType) {
	db.prepare(
		`DELETE FROM property_assignments WHERE is_deduced = TRUE AND type = ?`,
	).run(type)
}

/**
 * --- MAIN FUNCTION ---
 * Deduce properties of structures from given ones
 * by using the list of implications.
 */
export function deduce_properties_for_structures(type: StructureType) {
	console.info(`\n--- Deduce ${type} properties ---`)

	const db = get_client()

	const implications = get_normalized_implications(db, type)
	const structures = get_structures(db, type)
	const properties_dict = get_properties_dict(db, type)
	const get_assigned_properties = get_property_assignments(db, structures, type)

	const deduction = db.transaction(() => {
		delete_deduced_properties(db, type)

		for (const structure of structures) {
			const assigned = get_assigned_properties[structure.id]

			deduce_satisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				properties_dict,
				type,
			)

			deduce_unsatisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				assigned.unsatisfied,
				properties_dict,
				type,
			)
		}
	})

	deduction()

	// currently, only categories have duals
	if (type !== 'category') return

	const dual_deduction = db.transaction(() => {
		for (const structure of structures) {
			if (!is_dual_structure(structure)) continue

			const assigned = get_assigned_properties[structure.id]
			const dual_assigned = get_assigned_properties[structure.dual]

			deduce_dual_properties(
				db,
				structure,
				assigned.satisfied,
				assigned.unsatisfied,
				assigned.undecidable,
				dual_assigned.satisfied,
				dual_assigned.unsatisfied,
				dual_assigned.undecidable,
				properties_dict,
				type,
			)

			deduce_satisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				properties_dict,
				type,
			)

			deduce_unsatisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				assigned.unsatisfied,
				properties_dict,
				type,
			)
		}
	})

	dual_deduction()
}
