import { type Database } from 'better-sqlite3'
import { is_subset } from './shared'

export type CategoryMeta = {
	id: string
	name: string
	dual_category_id: string | null
}

export type NormalizedCategoryImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

export type CategoryPropertyMeta = {
	id: string
	dual_property_id: string | null
	relation: string
	negation: string
	conditional: string
}

/**
 * Returns the list of categories saved in the database.
 */
export function get_categories(db: Database) {
	return db
		.prepare(
			`SELECT id, name, dual_category_id
            FROM categories ORDER BY lower(name)`,
		)
		.all() as CategoryMeta[]
}

/**
 * Implications have the form
 * P_1 + ... + P_n ===> Q_1 + ... + Q_m
 * or
 * P_1 + ... + P_n <===> Q_1 + ... + Q_m.
 * This function decomposes them into normalized implications,
 * which have the form
 * P_1 + ... + P_n ===> Q.
 */
export function get_normalized_category_implications(
	db: Database,
): NormalizedCategoryImplication[] {
	const all_implications_db = db
		.prepare(
			`SELECT
				v.id,
				v.assumptions,
				v.conclusions,
				v.is_equivalence
			FROM category_implications_view v`,
		)
		.all() as {
		id: string
		assumptions: string
		conclusions: string
		is_equivalence: number
	}[]

	const implications: NormalizedCategoryImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions: string[] = JSON.parse(impl.assumptions)
		const conclusions: string[] = JSON.parse(impl.conclusions)

		for (const conclusion of conclusions) {
			implications.push({
				id: impl.id,
				assumptions: new Set(assumptions),
				conclusion,
			})
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: new Set(conclusions),
					conclusion: assumption,
				})
			}
		}
	}

	return implications
}

/**
 * Returns a dictionary of properties saved in the database.
 */
export function get_properties_dict(db: Database) {
	const properties = db
		.prepare(
			`SELECT
				p.id, p.dual_property_id, p.relation,
				r.negation, r.conditional
			FROM category_properties p
			INNER JOIN relations r ON r.relation = p.relation
			ORDER BY lower(p.id)`,
		)
		.all() as CategoryPropertyMeta[]

	const dict: Record<string, CategoryPropertyMeta> = {}

	for (const p of properties) dict[p.id] = p

	return dict
}

/**
 * Returns a dictionary with all properties that are satisfied or unsatisfied,
 * grouped by category and value.
 */
export function get_all_decided_properties(db: Database, categories: { id: string }[]) {
	const rows = db
		.prepare(
			`SELECT property_id, category_id, is_satisfied
			FROM category_property_assignments`,
		)
		.all() as { property_id: string; category_id: string; is_satisfied: number }[]

	const grouped: Record<string, { satisfied: Set<string>; unsatisfied: Set<string> }> =
		{}

	for (const category of categories) {
		grouped[category.id] = { satisfied: new Set(), unsatisfied: new Set() }
	}

	for (const row of rows) {
		const { property_id, category_id, is_satisfied } = row
		grouped[category_id][is_satisfied ? 'satisfied' : 'unsatisfied'].add(property_id)
	}

	return grouped
}

/**
 * Returns a dictionary with all assigned properties to categories,
 * grouped by category, value, and deduced flag.
 * This function is very similar to `get_all_decided_properties`.
 */
export function get_all_assignments(db: Database, categories: { id: string }[]) {
	const rows = db
		.prepare(
			`SELECT property_id, category_id, is_satisfied, is_deduced
			FROM category_property_assignments`,
		)
		.all() as {
		property_id: string
		category_id: string
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

	for (const category of categories) {
		grouped[category.id] = {
			satisfied: { non_deduced: new Set(), deduced: new Set() },
			unsatisfied: { non_deduced: new Set(), deduced: new Set() },
		}
	}

	for (const row of rows) {
		const { property_id, category_id, is_satisfied, is_deduced } = row
		grouped[category_id][is_satisfied ? 'satisfied' : 'unsatisfied'][
			is_deduced ? 'deduced' : 'non_deduced'
		].add(property_id)
	}

	return grouped
}

/**
 * Returns the next implication yielding a satisfied property:
 * When all of its assumptions are satisfied, its conclusion is satisfied.
 * We only consider conclusions that have not been marked as satisfied before.
 * If no such implication is found, null is returned.
 */
export function get_next_implication(
	implications: NormalizedCategoryImplication[],
	satisfied_properties: Set<string>,
) {
	for (const implication of implications) {
		const is_valid =
			is_subset(implication.assumptions, satisfied_properties) &&
			!satisfied_properties.has(implication.conclusion)
		if (is_valid) return implication
	}
	return null
}

/**
 * Returns the next implication together with an unsatisfied property:
 * If the implication has the form P + Q1 + Q2 + ... ===> R and
 * Q1, Q2, ... are satisfied, but R is not, then P is not satisfied;
 * this is a proof by contradiction.
 * We only consider properties P that have not been marked as unsatisfied before.
 * If no such implication is found, null is returned.
 */
export function get_next_implication_for_contradiction(
	implications: NormalizedCategoryImplication[],
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
) {
	for (const implication of implications) {
		if (!unsatisfied_properties.has(implication.conclusion)) continue
		for (const p of implication.assumptions) {
			const is_valid =
				!unsatisfied_properties.has(p) &&
				is_subset(implication.assumptions, satisfied_properties, p)
			if (is_valid) return { implication, property: p }
		}
	}
	return null
}

/**
 * Returns a dictionary mapping a category to the set of its assigned
 * properties (satisfied or unsatisfied) that should not be checked
 * by the redundancy check script.
 */
export function get_ignored_redundant_properties(db: Database) {
	const rows = db
		.prepare(
			`SELECT category_id, property_id
			FROM category_property_assignments
			WHERE check_redundancy = FALSE`,
		)
		.all() as { category_id: string; property_id: string }[]

	const grouped: Record<string, Set<string>> = {}

	for (const row of rows) {
		grouped[row.category_id] ??= new Set()
		grouped[row.category_id].add(row.property_id)
	}

	return grouped
}
