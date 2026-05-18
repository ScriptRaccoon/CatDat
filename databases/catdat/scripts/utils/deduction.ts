/**
 * This file contains all functions that are used to deduce properties
 * for categories and functors.
 */

import { type Database, SqliteError } from 'better-sqlite3'
import { get_client, is_subset } from './helpers'
import { get_categories, get_normalized_category_implications } from './categories'
import { get_functors, get_normalized_functor_implications } from './functors'

/**
 * An entity is a category or a functor.
 */
type EntityMeta = {
	id: string
	name: string
	dual?: string | null
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>
}

type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	// used for source and target assumptions of a functor
	associated_assumptions?: Record<string, Set<string>>
}

type PropertyMeta = {
	id: string
	dual_property_id: string | null
	relation: string
	negation: string
	conditional: string
}

/**
 * Returns the list of entities saved in the database of a given type.
 */
function get_entities(db: Database, type: 'category' | 'functor'): EntityMeta[] {
	if (type === 'category') return get_categories(db)
	if (type === 'functor') return get_functors(db)
	throw new Error('Unsupported type')
}

/**
 * Returns the list of normalized implications saved in the database of a given type.
 */
function get_normalized_implications(
	db: Database,
	type: 'category' | 'functor',
): NormalizedImplication[] {
	if (type === 'category') return get_normalized_category_implications(db)
	if (type === 'functor') return get_normalized_functor_implications(db)
	throw new Error('Unsupported type')
}

/**
 * Clears all the deduced properties. This runs before the deduction starts.
 */
function delete_deduced_properties(db: Database, type: 'category' | 'functor') {
	db.prepare(`DELETE FROM ${type}_property_assignments WHERE is_deduced = TRUE`).run()
}

/**
 * Returns a dictionary of properties saved in the database.
 */
function get_properties_dict(db: Database, type: 'category' | 'functor') {
	const properties = db
		.prepare(
			`SELECT
				p.id, p.dual_property_id, p.relation,
				r.negation, r.conditional
			FROM ${type}_properties p
			INNER JOIN relations r ON r.relation = p.relation
			ORDER BY lower(p.id)`,
		)
		.all() as PropertyMeta[]

	const dict: Record<string, PropertyMeta> = {}

	for (const p of properties) dict[p.id] = p

	return dict
}

/**
 * Returns a dictionary with all assigned properties of a list of entities
 * (categories or functors), grouped by id and value (satisfied / unsatisfied).
 */
function get_property_assignments(
	db: Database,
	entities: { id: string }[],
	type: 'category' | 'functor',
) {
	const rows = db
		.prepare(
			`SELECT property_id, ${type}_id as entity_id, is_satisfied
			FROM ${type}_property_assignments`,
		)
		.all() as { property_id: string; entity_id: string; is_satisfied: 0 | 1 }[]

	const grouped: Record<string, { satisfied: Set<string>; unsatisfied: Set<string> }> =
		{}

	for (const entity of entities) {
		grouped[entity.id] = { satisfied: new Set(), unsatisfied: new Set() }
	}

	for (const row of rows) {
		const { property_id, entity_id, is_satisfied } = row
		grouped[entity_id][is_satisfied ? 'satisfied' : 'unsatisfied'].add(property_id)
	}

	return grouped
}

/**
 * Returns a dictionary with all assigned properties of entities,
 * grouped by entity, value (satisfied / unsatisfied), and deduced status.
 */
export function get_property_assignments_by_deduction(
	db: Database,
	entities: { id: string }[],
	type: 'category' | 'functor',
) {
	const rows = db
		.prepare(
			`SELECT property_id, ${type}_id as entity_id, is_satisfied, is_deduced
			FROM ${type}_property_assignments`,
		)
		.all() as {
		property_id: string
		entity_id: string
		is_satisfied: number
		is_deduced: number
	}[]

	const grouped: Record<
		string,
		{
			satisfied: {
				non_deduced: Set<string>
				deduced: Set<string>
			}
			unsatisfied: {
				non_deduced: Set<string>
				deduced: Set<string>
			}
		}
	> = {}

	for (const entity of entities) {
		grouped[entity.id] = {
			satisfied: { non_deduced: new Set(), deduced: new Set() },
			unsatisfied: { non_deduced: new Set(), deduced: new Set() },
		}
	}

	for (const row of rows) {
		const { property_id, entity_id, is_satisfied, is_deduced } = row
		grouped[entity_id][is_satisfied ? 'satisfied' : 'unsatisfied'][
			is_deduced ? 'deduced' : 'non_deduced'
		].add(property_id)
	}

	return grouped
}

function get_assumption_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { assumptions } = implication

	return Array.from(assumptions)
		.map(
			(assumption) =>
				`${properties_dict[assumption][conditional ? 'conditional' : 'relation']} ${assumption}`,
		)
		.join(' and ')
}

function get_conclusion_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { conclusion } = implication

	return `${properties_dict[conclusion][conditional ? 'conditional' : 'relation']} ${conclusion}`
}

function get_reason_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	type: 'category' | 'functor',
) {
	const assumption_string = get_assumption_string(implication, properties_dict)
	const conclusion_string = get_conclusion_string(implication, properties_dict)

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`
	return `Since it ${assumption_string}, it ${conclusion_string} (${ref}).`
}

function get_contradiction_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	property: string,
	type: 'category' | 'functor',
) {
	const assumption_string = get_assumption_string(implication, properties_dict, true)
	const conclusion_string = get_conclusion_string(implication, properties_dict, true)

	const has_multiple_assumptions = implication.assumptions.size > 1

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`

	const contra = `Assume for contradiction that it ${properties_dict[property].relation} ${property}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}

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
 * Checks if an entity is a dual, but not the
 * original entity to prevent circular reasoning.
 */
function is_dual_entity(entity: EntityMeta): entity is EntityMeta & { dual: string } {
	return Boolean(entity.dual) && entity.name.toLowerCase().startsWith('dual')
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
