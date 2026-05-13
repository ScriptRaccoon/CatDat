import { SqliteError, type Database } from 'better-sqlite3'
import {
	CategoryMeta,
	CategoryPropertyMeta,
	get_all_decided_properties,
	get_categories,
	get_normalized_category_implications,
	get_properties_dict,
	type NormalizedCategoryImplication,
} from './categories.utils'
import {
	get_deduced_satisfied_properties,
	get_deduced_unsatisfied_properties,
} from './deduction.utils'

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

		const all_decided_properties = get_all_decided_properties(db, categories)

		for (const category of categories) {
			const decided = all_decided_properties[category.id]
			deduce_satisfied_category_properties(
				db,
				category.id,
				implications,
				decided.satisfied,
				properties_dict,
			)

			deduce_unsatisfied_category_properties(
				db,
				category.id,
				implications,
				decided.satisfied,
				decided.unsatisfied,
				properties_dict,
			)
		}

		for (const category of categories) {
			if (!is_dual_category(category)) continue

			const decided = all_decided_properties[category.id]
			const dual_decided = all_decided_properties[category.dual_category_id]

			deduce_dual_category_properties(
				db,
				category,
				decided.satisfied,
				decided.unsatisfied,
				dual_decided.satisfied,
				dual_decided.unsatisfied,
				properties_dict,
			)

			deduce_satisfied_category_properties(
				db,
				category.id,
				implications,
				decided.satisfied,
				properties_dict,
				{ check_conflicts: false },
			)

			deduce_unsatisfied_category_properties(
				db,
				category.id,
				implications,
				decided.satisfied,
				decided.unsatisfied,
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
	const { found, reasons } = get_deduced_satisfied_properties(
		satisfied_properties,
		implications,
		{ properties_dict },
	)

	for (const p of found) satisfied_properties.add(p)

	save_satisfied_properties(db, category_id, found, reasons, options)

	console.info(`Deduced ${found.size} satisfied properties for ${category_id}`)
}

/**
 * Saves the deduced satisfied properties to the database
 */
function save_satisfied_properties(
	db: Database,
	category_id: string,
	found: Set<string>,
	reasons: Record<string, string>,
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	if (found.size === 0) return

	const err_msg = `❌ Failed to complete deduction of satisfied properties for ${category_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`

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
	const { found, reasons } = get_deduced_unsatisfied_properties(
		satisfied_properties,
		unsatisfied_properties,
		implications,
		{ properties_dict },
	)

	for (const p of found) unsatisfied_properties.add(p)

	save_unsatisfied_properties(db, category_id, found, reasons, options)

	console.info(`Deduced ${found.size} unsatisfied properties for ${category_id}`)
}

/**
 * Saves the deduced unsatisfied properties to the database
 */
function save_unsatisfied_properties(
	db: Database,
	category_id: string,
	found: Set<string>,
	reasons: Record<string, string>,
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	if (found.size === 0) return

	const err_msg = `❌ Failed to complete deduction of unsatisfied properties for ${category_id} because of a conflict. The likely cause is a contradiction between its assigned properties.`

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
 * Checks if a category is a dual category, but not the
 * original category to prevent circular reasoning.
 */
function is_dual_category(
	category: CategoryMeta,
): category is CategoryMeta & { dual_category_id: string } {
	return (
		category.dual_category_id !== null &&
		category.name.toLowerCase().startsWith('dual')
	)
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
