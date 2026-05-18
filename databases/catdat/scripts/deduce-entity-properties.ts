/**
 * This file contains all functions that are used to deduce properties
 * for categories and functors.
 */

import { type Database, SqliteError } from 'better-sqlite3'
import { get_client, is_subset } from './utils/helpers'
import {
	get_entities,
	get_normalized_implications,
	get_properties_dict,
	get_property_assignments,
	is_dual_entity,
	type EntityMeta,
	type NormalizedImplication,
	type PropertyMeta,
} from './utils/deduction'
import { get_contradiction_string, get_reason_string } from './utils/implications'

/**
 * Returns the set of satisfied properties that can be deduced from a set
 * of satisfied properties, based on a list of normalized implications. If a
 * property dictionary is provided, human-readable reasons are generated as well.
 */
export function get_deduced_satisfied_properties(
	satisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	options: {
		properties_dict?: Record<string, PropertyMeta>
		stop_when_found?: string
	},
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>,
	type: 'category' | 'functor' = 'category',
) {
	const found = new Set<string>()
	const reasons: Record<string, string> = {}
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
				return { deduced_satisfied_properties, found, reasons }
			}

			if (options.properties_dict) {
				reasons[implication.conclusion] = get_reason_string(
					implication,
					options.properties_dict,
					type,
				)
			}
		}

		for (const p of newly_found) deduced_satisfied_properties.add(p)

		if (!newly_found.size) break
	}

	return { deduced_satisfied_properties, found, reasons }
}

/**
 * Returns the set of unsatisfied properties that can be deduced from
 * a set of satisfied properties and a set of unsatisfied properties,
 * based on a list of normalized implications. If a property dictionary
 * is provided, human-readable reasons are generated as well.
 */
export function get_deduced_unsatisfied_properties(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	options: {
		properties_dict?: Record<string, PropertyMeta>
		stop_when_found?: string
	},
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>,
	type: 'category' | 'functor' = 'category',
) {
	const found = new Set<string>()
	const reasons: Record<string, string> = {}
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
					return { deduced_unsatisfied_properties, found, reasons }
				}

				newly_found.add(p)
				found.add(p)

				if (options.properties_dict) {
					reasons[p] = get_contradiction_string(
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

	return { deduced_unsatisfied_properties, found, reasons }
}

/**
 * Saves the deduced satisfied properties to the database
 */
function save_satisfied_properties(
	db: Database,
	entity_id: string,
	found: Set<string>,
	reasons: Record<string, string>,
	type: 'category' | 'functor',
) {
	if (found.size === 0) return

	const err_msg = `❌ Failed to complete deduction of satisfied properties for ${entity_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`

	const property_insert = db.prepare(`
		INSERT INTO ${type}_property_assignments
			(${type}_id, property_id, is_satisfied, reason, is_deduced)
		VALUES (?, ?, TRUE, ?, TRUE)
	`)

	try {
		for (const p of found) {
			property_insert.run(entity_id, p, reasons[p])
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
	entity_id: string,
	found: Set<string>,
	reasons: Record<string, string>,
	type: 'category' | 'functor',
) {
	if (found.size === 0) return

	const err_msg = `❌ Failed to complete deduction of unsatisfied properties for ${entity_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`

	const property_insert = db.prepare(`
		INSERT INTO ${type}_property_assignments
			(${type}_id, property_id, is_satisfied, reason, is_deduced)
		VALUES (?, ?, FALSE, ?, TRUE)
	`)

	try {
		for (const p of found) {
			property_insert.run(entity_id, p, reasons[p])
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
 * Deduce satisfied properties for a given entity from given ones
 * by using the list of normalized implications.
 * Warning: This mutates the set of satisfied properties.
 */
function deduce_satisfied_properties(
	db: Database,
	entity: EntityMeta,
	implications: NormalizedImplication[],
	satisfied_properties: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: 'category' | 'functor',
) {
	const { found, reasons } = get_deduced_satisfied_properties(
		satisfied_properties,
		implications,
		{ properties_dict },
		entity.associated_satisfied_properties,
		type,
	)

	for (const p of found) satisfied_properties.add(p)

	save_satisfied_properties(db, entity.id, found, reasons, type)

	console.info(`Deduced ${found.size} satisfied properties for ${entity.id}`)
}

/**
 * Deduce unsatisfied properties for a given entity from given ones
 * by using the satisfied properties and the list of normalized implications.
 * Warning: This mutates the set of unsatisfied properties.
 */
function deduce_unsatisfied_properties(
	db: Database,
	entity: EntityMeta,
	implications: NormalizedImplication[],
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: 'category' | 'functor',
) {
	const { found, reasons } = get_deduced_unsatisfied_properties(
		satisfied_properties,
		unsatisfied_properties,
		implications,
		{ properties_dict },
		entity.associated_satisfied_properties,
		type,
	)

	for (const p of found) unsatisfied_properties.add(p)

	save_unsatisfied_properties(db, entity.id, found, reasons, type)

	console.info(`Deduced ${found.size} unsatisfied properties for ${entity.id}`)
}

/**
 * Assign dual properties to dual entities:
 * If C has property P, then C^op has property P^op (if defined).
 * Warning: This mutates the sets of satisfied and unsatisfied properties.
 */
function deduce_dual_properties(
	db: Database,
	entity: EntityMeta & { dual: string },
	satisfied: Set<string>,
	unsatisfied: Set<string>,
	dual_satisfied: Set<string>,
	dual_unsatisfied: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
	type: 'category' | 'functor',
) {
	const new_satisfied = new Set<string>()

	for (const p of dual_satisfied) {
		const p_dual = properties_dict[p].dual_property_id
		if (!p_dual || satisfied.has(p_dual)) continue
		new_satisfied.add(p_dual)
		satisfied.add(p_dual)
	}

	const new_unsatisfied = new Set<string>()

	for (const p of dual_unsatisfied) {
		const p_dual = properties_dict[p].dual_property_id
		if (!p_dual || unsatisfied.has(p_dual)) continue
		new_unsatisfied.add(p_dual)
		unsatisfied.add(p_dual)
	}

	const property_insert = db.prepare(`
		INSERT INTO ${type}_property_assignments
			(${type}_id, property_id, is_satisfied, reason, is_deduced)
		VALUES (?, ?, ?, ?, TRUE)
	`)

	const reason_satisfied = 'Its dual ${type} satisfies the dual property.'
	const reason_unsatisfied = 'Its dual ${type} does not satisfy the dual property.'

	for (const p of new_satisfied) {
		property_insert.run(entity.id, p, 1, reason_satisfied)
	}

	console.info(
		`Deduced ${new_satisfied.size} satisfied properties by duality for ${entity.id}`,
	)

	for (const q of new_unsatisfied) {
		property_insert.run(entity.id, q, 0, reason_unsatisfied)
	}

	console.info(
		`Deduced ${new_unsatisfied.size} unsatisfied properties by duality for ${entity.id}`,
	)
}

/**
 * Clears all the deduced properties. This runs before the deduction starts.
 */
function delete_deduced_properties(db: Database, type: 'category' | 'functor') {
	db.prepare(`DELETE FROM ${type}_property_assignments WHERE is_deduced = TRUE`).run()
}

/**
 * --- MAIN FUNCTION ---
 * Deduce properties of entities from given ones
 * by using the list of implications.
 */
export function deduce_properties_for_entities(type: 'category' | 'functor') {
	console.info(`\n--- Deduce ${type} properties ---`)

	const db = get_client()

	const implications = get_normalized_implications(db, type)
	const entities = get_entities(db, type)
	const properties_dict = get_properties_dict(db, type)
	const all_decided_properties = get_property_assignments(db, entities, type)

	const deduction = db.transaction(() => {
		delete_deduced_properties(db, type)

		for (const entity of entities) {
			const decided = all_decided_properties[entity.id]

			deduce_satisfied_properties(
				db,
				entity,
				implications,
				decided.satisfied,
				properties_dict,
				type,
			)

			deduce_unsatisfied_properties(
				db,
				entity,
				implications,
				decided.satisfied,
				decided.unsatisfied,
				properties_dict,
				type,
			)
		}
	})

	deduction()

	// currently, only categories have duals
	if (type !== 'category') return

	const dual_deduction = db.transaction(() => {
		for (const entity of entities) {
			if (!is_dual_entity(entity)) continue

			const decided = all_decided_properties[entity.id]
			const dual_decided = all_decided_properties[entity.dual]

			deduce_dual_properties(
				db,
				entity,
				decided.satisfied,
				decided.unsatisfied,
				dual_decided.satisfied,
				dual_decided.unsatisfied,
				properties_dict,
				type,
			)

			deduce_satisfied_properties(
				db,
				entity,
				implications,
				decided.satisfied,
				properties_dict,
				type,
			)

			deduce_unsatisfied_properties(
				db,
				entity,
				implications,
				decided.satisfied,
				decided.unsatisfied,
				properties_dict,
				type,
			)
		}
	})

	dual_deduction()
}
