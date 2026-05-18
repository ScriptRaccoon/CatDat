import { type Database } from 'better-sqlite3'
import { get_categories, get_normalized_category_implications } from './categories'
import { get_functors, get_normalized_functor_implications } from './functors'

/**
 * An entity is a category or a functor.
 */
export type EntityMeta = {
	id: string
	name: string
	dual?: string | null
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>
}

export type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	// used for source and target assumptions of a functor in an implication
	associated_assumptions?: Record<string, Set<string>>
}

export type PropertyMeta = {
	id: string
	dual_property_id: string | null
	relation: string
	negation: string
	conditional: string
}

/**
 * Returns the list of entities saved in the database of a given type.
 */
export function get_entities(db: Database, type: 'category' | 'functor'): EntityMeta[] {
	if (type === 'category') return get_categories(db)
	if (type === 'functor') return get_functors(db)
	throw new Error('Unsupported type')
}

/**
 * Returns the list of normalized implications saved in the database of a given type.
 */
export function get_normalized_implications(
	db: Database,
	type: 'category' | 'functor',
): NormalizedImplication[] {
	if (type === 'category') return get_normalized_category_implications(db)
	if (type === 'functor') return get_normalized_functor_implications(db)
	throw new Error('Unsupported type')
}

/**
 * Returns a dictionary of properties saved in the database.
 */
export function get_properties_dict(db: Database, type: 'category' | 'functor') {
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
export function get_property_assignments(
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
			satisfied: { non_deduced: Set<string>; deduced: Set<string> }
			unsatisfied: { non_deduced: Set<string>; deduced: Set<string> }
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

/**
 * Checks if an entity is a dual, but not the
 * original entity to prevent circular reasoning.
 */
export function is_dual_entity(
	entity: EntityMeta,
): entity is EntityMeta & { dual: string } {
	return Boolean(entity.dual) && entity.name.toLowerCase().startsWith('dual')
}
