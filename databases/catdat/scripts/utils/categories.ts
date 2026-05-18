import { type Database } from 'better-sqlite3'

type CategoryMeta = {
	id: string
	name: string
	dual: string | null
}

export type NormalizedCategoryImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

/**
 * Returns the list of categories saved in the database.
 */
export function get_categories(db: Database) {
	return db
		.prepare(
			`SELECT id, name, dual_category_id as dual
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
	type ImplicationDB = {
		id: string
		assumptions: string
		conclusions: string
		is_equivalence: number
	}

	const all_implications_db = db
		.prepare(
			`SELECT id, assumptions, conclusions, is_equivalence
			FROM category_implications_view`,
		)
		.all() as ImplicationDB[]

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

	for (const { category_id, property_id } of rows) {
		grouped[category_id] ??= new Set()
		grouped[category_id].add(property_id)
	}

	return grouped
}
