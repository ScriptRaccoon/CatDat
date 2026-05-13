import { SqliteError, type Database } from 'better-sqlite3'
import { get_contradiction_string, get_reason_string, is_subset } from './shared'
import {
	CategoryMeta,
	CategoryPropertyMeta,
	get_all_decided_properties,
	get_categories,
	get_normalized_category_implications,
	get_properties_dict,
	type NormalizedCategoryImplication,
} from './categories.utils'

/**
 * Deduce properties of categories from given ones
 * by using the list of implications.
 */
export function deduce_category_properties(db: Database) {
	console.info('\n--- Deduce category properties ---')

	const implications = get_normalized_category_implications(db)
	const categories = get_categories(db)
	const properties_dict = get_properties_dict(db)

	const deduction = db.transaction(() => {
		delete_deduced_category_properties(db)

		const decided_properties = get_all_decided_properties(db, categories)

		for (const category of categories) {
			deduce_satisfied_category_properties(
				db,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
				properties_dict,
			)

			deduce_unsatisfied_category_properties(
				db,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
				decided_properties[category.id].unsatisfied,
				properties_dict,
			)
		}

		for (const category of categories) {
			if (
				!category.dual_category_id ||
				!category.name.toLowerCase().startsWith('dual')
			) {
				continue
			}

			deduce_dual_category_properties(
				db,
				category,
				decided_properties[category.id].satisfied,
				decided_properties[category.id].unsatisfied,
				decided_properties[category.dual_category_id].satisfied,
				decided_properties[category.dual_category_id].unsatisfied,
				properties_dict,
			)

			deduce_satisfied_category_properties(
				db,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
				properties_dict,
				{ check_conflicts: false },
			)

			deduce_unsatisfied_category_properties(
				db,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
				decided_properties[category.id].unsatisfied,
				properties_dict,
				{ check_conflicts: false },
			)
		}
	})

	deduction()
}

/**
 * Clears all the deduced properties.
 * This runs before the deduction starts.
 */
function delete_deduced_category_properties(db: Database) {
	db.prepare(`DELETE FROM category_property_assignments WHERE is_deduced = TRUE`).run()
}

/**
 * Deduce satisfied properties for a given category from given ones
 * by using the list of normalized implications.
 * Warning: This function mutates the set of satisfied properties.
 */
function deduce_satisfied_category_properties(
	db: Database,
	category_id: string,
	implications: NormalizedCategoryImplication[],
	satisfied_properties: Set<string>,
	properties_dict: Record<string, CategoryPropertyMeta>,
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	const found = new Set<string>()
	const reasons: Record<string, string> = {}

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			const is_valid =
				is_subset(implication.assumptions, satisfied_properties) &&
				!satisfied_properties.has(implication.conclusion) &&
				!newly_found.has(implication.conclusion)

			if (!is_valid) continue

			newly_found.add(implication.conclusion)
			found.add(implication.conclusion)

			reasons[implication.conclusion] = get_reason_string(
				implication,
				properties_dict,
			)
		}

		for (const p of newly_found) satisfied_properties.add(p)

		if (!newly_found.size) break
	}

	if (found.size > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (const id of found) {
			value_fragments.push(`(?, ?, TRUE, ?, TRUE)`)
			values.push(category_id, id, reasons[id])
		}

		const conflict_clause = options.check_conflicts
			? ''
			: 'ON CONFLICT (category_id, property_id) DO NOTHING'

		const insert_sql = `
			INSERT INTO category_property_assignments
				(category_id, property_id, is_satisfied, reason, is_deduced)
			VALUES ${value_fragments.join(',\n')}
			${conflict_clause}
		`

		try {
			db.prepare(insert_sql).run(values)
		} catch (err) {
			if (err instanceof SqliteError) {
				if (err.code.startsWith('SQLITE_CONSTRAINT')) {
					console.error(
						`❌ Failed to complete deduction of satisfied properties for ${category_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`,
					)
				}
				console.error(err.message)
			} else {
				console.error(err)
			}
			process.exit(1)
		}
	}

	console.info(`Deduced ${found.size} satisfied properties for ${category_id}`)
}

/**
 * Deduce unsatisfied properties for a given category from given ones
 * by using the satisfied properties and the list of normalized implications.
 * Warning: This function mutates the set of unsatisfied properties.
 */
function deduce_unsatisfied_category_properties(
	db: Database,
	category_id: string,
	implications: NormalizedCategoryImplication[],
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	properties_dict: Record<string, CategoryPropertyMeta>,
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	const found = new Set<string>()
	const reasons: Record<string, string> = {}

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			if (!unsatisfied_properties.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!unsatisfied_properties.has(p) &&
					!newly_found.has(p) &&
					is_subset(implication.assumptions, satisfied_properties, {
						exception: p,
					})
				if (!is_valid) continue

				if (satisfied_properties.has(p)) {
					throw new Error(`Contradiction has been found for: ${p}`)
				}

				newly_found.add(p)
				found.add(p)

				reasons[p] = get_contradiction_string(implication, properties_dict, p)
			}
		}

		for (const p of newly_found) unsatisfied_properties.add(p)

		if (!newly_found.size) break
	}

	if (found.size > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (const id of found) {
			value_fragments.push('(?, ?, FALSE, ?, TRUE)')
			values.push(category_id, id, reasons[id])
		}

		const conflict_clause = options.check_conflicts
			? ''
			: 'ON CONFLICT (category_id, property_id) DO NOTHING'

		const insert_query = `
			INSERT INTO category_property_assignments
				(category_id, property_id, is_satisfied, reason, is_deduced)
			VALUES ${value_fragments.join(',\n')}
			${conflict_clause}
		`

		try {
			db.prepare(insert_query).run(values)
		} catch (err) {
			if (err instanceof SqliteError) {
				if (err.code.startsWith('SQLITE_CONSTRAINT')) {
					console.error(
						`❌ Failed to complete deduction of unsatisfied properties for ${category_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`,
					)
				}
				console.error(err.message)
			} else {
				console.error(err)
			}
			process.exit(1)
		}
	}

	console.info(`Deduced ${found.size} unsatisfied properties for ${category_id}`)
}

/**
 * Assign dual properties to dual categories:
 * If C has property P, then C^op has property P^op (if defined).
 */
function deduce_dual_category_properties(
	db: Database,
	category: CategoryMeta,
	satisfied: Set<string>,
	unsatisfied: Set<string>,
	dual_satisfied: Set<string>,
	dual_unsatisfied: Set<string>,
	properties_dict: Record<string, CategoryPropertyMeta>,
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

	if (new_satisfied.size > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (const p of new_satisfied) {
			value_fragments.push('(?, ?, TRUE, ?, TRUE)')
			values.push(category.id, p, 'Its dual category satisfies the dual property.')
		}

		const insert_query = `
		INSERT INTO category_property_assignments
			(category_id, property_id, is_satisfied, reason, is_deduced)
		VALUES ${value_fragments.join(',\n')}`

		db.prepare(insert_query).run(values)

		console.info(
			`Deduced ${new_satisfied.size} satisfied properties by duality for ${category.id}`,
		)
	}

	if (new_unsatisfied.size > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (const p of new_unsatisfied) {
			value_fragments.push('(?, ?, FALSE, ?, TRUE)')
			values.push(
				category.id,
				p,
				'Its dual category does not satisfy the dual property.',
			)
		}

		const insert_query = `
		INSERT INTO category_property_assignments
			(category_id, property_id, is_satisfied, reason, is_deduced)
		VALUES ${value_fragments.join(',\n')}`

		db.prepare(insert_query).run(values)

		console.info(
			`Deduced ${new_unsatisfied.size} unsatisfied properties by duality for ${category.id}`,
		)
	}
}
