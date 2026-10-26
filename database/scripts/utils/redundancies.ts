import type { Database } from 'better-sqlite3'
import { get_property_assignments_by_deduction } from './properties'
import { STRUCTURE_TYPES, type StructureType } from '#shared/config.ts'
import {
	get_normalized_implications,
	stringify_implication,
	type NormalizedImplication
} from '#shared/implications.ts'
import { deduce_properties, refute_properties } from '#shared/deduction.utils.ts'
import { get_structures } from './structures'
import { capitalize, devlog, remove_underscores } from '#shared/utils.ts'

/**
 * Tests that there are no redundant (structure, property)-assignments,
 * except for those marked with check_redundancy: false.
 * All redundancies are collected before an error is thrown.
 */
export function test_no_redundant_assignments(db: Database) {
	const errors: string[] = []

	for (const type of STRUCTURE_TYPES) {
		errors.push(...get_redundant_assignment_errors(db, type))
	}

	if (errors.length > 0) {
		const hint = [
			'',
			'Remove each redundant assignment from its YAML file.',
			'Only keep it if there is a good reason, e.g. the proof is insightful or',
			'establishes a result used later, and then mark it with check_redundancy: false.'
		]
		throw new Error([...errors, ...hint].join('\n'))
	}
}

/**
 * Checks for redundant (structure, property)-assignments and returns
 * one error message per structure and kind (satisfied or unsatisfied).
 */
function get_redundant_assignment_errors(db: Database, type: StructureType): string[] {
	const implications = get_normalized_implications(db, type)

	const structures = get_structures(db, type)

	const assignments = get_property_assignments_by_deduction(db, structures, type)
	const ignore_dict = get_ignored_redundant_assignments(db, type)

	const ignore_count = Object.keys(ignore_dict).reduce(
		(count, id) => count + ignore_dict[id].size,
		0
	)

	const errors: string[] = []

	for (const structure of structures) {
		const redundant_satisfied_property = get_redundant_satisfied_property(
			assignments[structure.id].satisfied.non_deduced,
			implications,
			ignore_dict[structure.id],
			structure.associated_satisfied_properties
		)

		if (redundant_satisfied_property) {
			errors.push(
				`❌ Redundant satisfied property for ${structure.id}: "${redundant_satisfied_property}" is implied by others.`
			)
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
			errors.push(
				`❌ Redundant unsatisfied property for ${structure.id}: "${redundant_unsatisfied_property}" is implied by others.`
			)
		}
	}

	if (errors.length === 0) {
		devlog(
			`✅ ${capitalize(remove_underscores(type))} property assignments are not redundant (${ignore_count} ignored)`
		)
	}

	return errors
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
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
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
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
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
function get_ignored_redundant_assignments(db: Database, type: StructureType) {
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
