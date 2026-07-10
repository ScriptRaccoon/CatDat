import { get_client } from '$shared/db'
import { get_property_assignments_by_deduction } from './utils/properties'
import { STRUCTURE_TYPES, type StructureType } from '$shared/config'
import {
	get_normalized_implications,
	stringify_implication,
	type NormalizedImplication
} from '$shared/implications'
import { deduce_properties, refute_properties } from '$shared/deduction.utils'
import { get_structures } from './utils/structures'

const db = get_client({ readonly: true })

check_redundancies()

/**
 * Checks for redundancies in the database.
 * No error is thrown intentionally.
 */
function check_redundancies() {
	for (const type of STRUCTURE_TYPES) {
		check_redundant_property_assignments(type)
	}
}

/**
 * Checks for redundant (structure, property)-assignments and logs
 * one per structure if any are found (satisfied or unsatisfied).
 * No error is thrown intentionally.
 */
function check_redundant_property_assignments(type: StructureType) {
	console.info(`\n--- Check redundant ${type} property assignments ---`)

	const implications = get_normalized_implications(db, type)

	const structures = get_structures(db, type)

	const assignments = get_property_assignments_by_deduction(db, structures, type)
	const ignore_dict = get_ignored_redundant_assignments(type)

	const ignore_count = Object.keys(ignore_dict).reduce(
		(count, id) => count + ignore_dict[id].size,
		0
	)

	let redundancy_count = 0

	for (const structure of structures) {
		const redundant_satisfied_property = get_redundant_satisfied_property(
			assignments[structure.id].satisfied.non_deduced,
			implications,
			ignore_dict[structure.id],
			structure.associated_satisfied_properties
		)

		if (redundant_satisfied_property) {
			console.warn(
				`🟠 Redundant satisfied property for ${structure.id}: "${redundant_satisfied_property}" is implied by others.`
			)

			redundancy_count++
		}

		const all_satisfied_properties = new Set([
			...assignments[structure.id].satisfied.non_deduced,
			...assignments[structure.id].satisfied.deduced
		])

		const redundant_unsatisfied_property = get_redundant_unsatisfied_property(
			all_satisfied_properties,
			assignments[structure.id].unsatisfied.non_deduced,
			implications,
			ignore_dict[structure.id],
			structure.associated_satisfied_properties
		)

		if (redundant_unsatisfied_property) {
			console.warn(
				`🟡 Redundant unsatisfied property for ${structure.id}: "${redundant_unsatisfied_property}" is implied by others.`
			)

			redundancy_count++
		}
	}

	if (redundancy_count === 0) {
		console.info('✅ No redundant assignments found')
	} else {
		console.info(`Found ${redundancy_count} redundant assignments`)
	}

	if (ignore_count > 0) {
		console.info(`${ignore_count} redundant assignments have been ignored`)
	}
}

/**
 * From a given set of properties, returns a property that can be
 * deduced from the other properties in this set, based on a list
 * of normalized implications.
 * If no such property exists, null is returned.
 */
function get_redundant_satisfied_property(
	satisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	ignored: Set<string> = new Set(),
	associated_satisfied_properties?: Record<string, Set<string>>
) {
	for (const p of [...satisfied_properties]) {
		if (ignored.has(p)) continue

		satisfied_properties.delete(p)

		const { deduced_satisfied_properties } = deduce_properties(
			satisfied_properties,
			implications,
			(implication) => ({
				proof: stringify_implication(implication),
				stop: implication.conclusion === p
			}),
			associated_satisfied_properties
		)

		if (deduced_satisfied_properties.has(p)) return p

		satisfied_properties.add(p)
	}

	return null
}

/**
 * From a given set of satisfied and unsatisfied properties,
 * returns a unsatisfied property that can be deduced from these,
 * based on a list of normalized implications.
 * If no such property exists, null is returned.
 */
function get_redundant_unsatisfied_property(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	ignored: Set<string> = new Set(),
	associated_satisfied_properties?: Record<string, Set<string>>
) {
	for (const p of [...unsatisfied_properties]) {
		if (ignored.has(p)) continue

		unsatisfied_properties.delete(p)

		const { deduced_unsatisfied_properties } = refute_properties(
			satisfied_properties,
			unsatisfied_properties,
			implications,
			(implication, property) => ({
				proof: stringify_implication(implication),
				stop: property === p
			}),
			associated_satisfied_properties
		)

		if (deduced_unsatisfied_properties.has(p)) return p

		unsatisfied_properties.add(p)
	}
	return null
}

/**
 * Returns a dictionary mapping a structure to the set of its assigned
 * properties (satisfied or unsatisfied) that should not be checked
 * by the redundancy check script.
 */
function get_ignored_redundant_assignments(type: StructureType) {
	const rows = db
		.prepare<[StructureType], { structure_id: string; property_id: string }>(
			`SELECT structure_id, property_id
			FROM property_assignments
			WHERE check_redundancy = FALSE AND type = ?`
		)
		.all(type)

	const grouped: Record<string, Set<string>> = {}

	for (const { structure_id, property_id } of rows) {
		grouped[structure_id] ??= new Set()
		grouped[structure_id].add(property_id)
	}

	return grouped
}
