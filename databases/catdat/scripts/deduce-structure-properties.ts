/**
 * This file contains all functions that are used to deduce properties
 * for categories and other categorical structures.
 */

import { type Database } from 'better-sqlite3'
import { deduce_properties, refute_properties } from '$shared/deduction.utils'
import { get_client } from '$shared/db'
import {
	get_properties_dict,
	get_property_assignments,
	type PropertyMeta
} from './utils/properties'
import { get_contradiction_string, get_proof_string } from './utils/implications'
import { type StructureType, STRUCTURE_TYPES_WITH_DUALS } from '$shared/config'
import { get_structures, is_dual_structure, type StructureMeta } from './utils/structures'
import { get_normalized_implications, NormalizedImplication } from '$shared/implications'

/**
 * Deduce satisfied properties for a given structure from given ones
 * by using a list of normalized implications.
 * Human-readable proofs are generated as well.
 * Warning: This mutates the set of satisfied properties.
 */
function deduce_satisfied_properties(
	db: Database,
	structure: StructureMeta,
	implications: NormalizedImplication[],
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: StructureType
) {
	const { found, proofs, stop_property } = deduce_properties(
		satisfied_properties,
		implications,
		(implication) => ({
			proof: get_proof_string(implication, properties_dict, type),
			stop: unsatisfied_properties.has(implication.conclusion)
		}),
		structure.associated_satisfied_properties
	)

	if (stop_property) {
		console.error(
			`❌ Property assignments of ${structure.id} are contradictory: "${stop_property}" can be deduced from its satisfied properties, but is marked as unsatisfied.`
		)
		process.exit(1)
	}

	for (const p of found) satisfied_properties.add(p)

	save_satisfied_properties(db, structure.id, found, proofs, type)

	console.info(`Deduced ${found.size} satisfied properties for ${structure.id}`)
}

/**
 * Deduce unsatisfied properties for a given structure from given ones
 * by using satisfied properties and a list of normalized implications.
 * Human-readable proofs are generated as well.
 * Warning: This mutates the set of unsatisfied properties.
 */
function deduce_unsatisfied_properties(
	db: Database,
	structure: StructureMeta,
	implications: NormalizedImplication[],
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: StructureType
) {
	const { found, proofs } = refute_properties<string>(
		satisfied_properties,
		unsatisfied_properties,
		implications,
		(implication, property) => {
			return {
				proof: get_contradiction_string(
					implication,
					properties_dict,
					property,
					type
				),
				stop: false
			}
		},
		structure.associated_satisfied_properties
	)

	for (const p of found) unsatisfied_properties.add(p)

	save_unsatisfied_properties(db, structure.id, found, proofs, type)

	console.info(`Deduced ${found.size} unsatisfied properties for ${structure.id}`)
}

/**
 * Saves the deduced satisfied properties to the database
 */
function save_satisfied_properties(
	db: Database,
	structure_id: string,
	found: Set<string>,
	proofs: Partial<Record<string, string>>,
	type: StructureType
) {
	if (found.size === 0) return

	const property_insert = db.prepare(`
		INSERT INTO property_assignments
			(structure_id, property_id, type, is_satisfied, proof, is_deduced)
		VALUES (?, ?, ?, TRUE, ?, TRUE)
	`)

	for (const p of found) {
		property_insert.run(structure_id, p, type, proofs[p])
	}
}

/**
 * Saves the deduced unsatisfied properties to the database
 */
function save_unsatisfied_properties(
	db: Database,
	structure_id: string,
	found: Set<string>,
	proofs: Partial<Record<string, string>>,
	type: StructureType
) {
	if (found.size === 0) return

	const property_insert = db.prepare(`
		INSERT INTO property_assignments
			(structure_id, property_id, type, is_satisfied, proof, is_deduced)
		VALUES (?, ?, ?, FALSE, ?, TRUE)
	`)

	for (const p of found) {
		property_insert.run(structure_id, p, type, proofs[p])
	}
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
	type: StructureType
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
		`Deduced ${new_satisfied.size} satisfied properties by duality for ${structure.id}`
	)

	for (const q of new_unsatisfied) {
		property_insert.run(structure.id, q, type, 0, proof_unsatisfied)
	}

	console.info(
		`Deduced ${new_unsatisfied.size} unsatisfied properties by duality for ${structure.id}`
	)

	for (const q of new_undecidable) {
		property_insert.run(structure.id, q, type, null, proof_undecidable)
	}

	console.info(
		`Deduced ${new_undecidable.size} undecidable properties by duality for ${structure.id}`
	)
}

/**
 * Clears all the deduced properties. This runs before the deduction starts.
 */
function delete_deduced_properties(db: Database, type: StructureType) {
	db.prepare(
		`DELETE FROM property_assignments WHERE is_deduced = TRUE AND type = ?`
	).run(type)
}

/**
 * Main function: Deduce properties of structures from given ones
 * by using the stored implications.
 */
export function deduce_properties_for_structures(type: StructureType) {
	console.info(`\n--- Deduce ${type} properties ---`)

	const db = get_client({ readonly: false })

	delete_deduced_properties(db, type)

	const implications = get_normalized_implications(db, type)
	const structures = get_structures(db, type)
	const properties_dict = get_properties_dict(db, type)
	const get_assigned_properties = get_property_assignments(db, structures, type)

	const deduction = db.transaction(() => {
		for (const structure of structures) {
			const assigned = get_assigned_properties[structure.id]

			deduce_satisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				assigned.unsatisfied,
				properties_dict,
				type
			)

			deduce_unsatisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				assigned.unsatisfied,
				properties_dict,
				type
			)
		}
	})

	deduction()

	if (!STRUCTURE_TYPES_WITH_DUALS.includes(type)) return

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
				type
			)

			deduce_satisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				assigned.unsatisfied,
				properties_dict,
				type
			)

			deduce_unsatisfied_properties(
				db,
				structure,
				implications,
				assigned.satisfied,
				assigned.unsatisfied,
				properties_dict,
				type
			)
		}
	})

	dual_deduction()
}
