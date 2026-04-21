import { type Transaction, type Client, LibsqlError } from '@libsql/client'
import {
	get_assumption_string,
	get_conclusion_string,
	is_subset,
	NormalizedCategoryImplication,
} from './shared'

type CategoryMeta = {
	id: string
	name: string
	dual_category_id: string | null
}

type PropertyMeta = {
	id: string
	dual_property_id: string | null
}

/**
 * Deduce properties of categories from given ones
 * by using the list of implications.
 */
export async function deduce_category_properties(db: Client) {
	console.info('\n--- Deduce category properties ---')

	const tx = await db.transaction()

	try {
		const implications = await get_normalized_category_implications(tx)
		const categories = await get_categories(tx)
		const properties_dict = await get_properties_dict(tx)

		await delete_deduced_category_properties(tx)

		const decided_properties = await get_all_decided_properties(tx, categories)

		for (const category of categories) {
			await deduce_satisfied_category_properties(
				tx,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
			)
			await deduce_unsatisfied_category_properties(
				tx,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
				decided_properties[category.id].unsatisfied,
			)
		}

		for (const category of categories) {
			if (
				!category.dual_category_id ||
				!category.name.toLowerCase().startsWith('dual')
			) {
				continue
			}

			await deduce_dual_category_properties(
				tx,
				category,
				decided_properties[category.id].satisfied,
				decided_properties[category.id].unsatisfied,
				decided_properties[category.dual_category_id].satisfied,
				decided_properties[category.dual_category_id].unsatisfied,
				properties_dict,
			)

			await deduce_satisfied_category_properties(
				tx,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
				{ check_conflicts: false },
			)
			await deduce_unsatisfied_category_properties(
				tx,
				category.id,
				implications,
				decided_properties[category.id].satisfied,
				decided_properties[category.id].unsatisfied,
				{ check_conflicts: false },
			)
		}

		await tx.commit()
	} catch (err) {
		console.error(err)
		await tx.rollback()
		process.exit(1)
	}
}

/**
 * Implications have the form:
 *
 * P_1 + ... + P_n ----> Q_1 + ... + Q_m
 *
 * or
 *
 * P_1 + ... + P_n <---> Q_1 + ... + Q_m
 *
 * This function decomposes them into normalized implications,
 * which have the form:
 *
 * P_1 + ... + P_n ----> Q
 */
async function get_normalized_category_implications(
	tx: Transaction,
): Promise<NormalizedCategoryImplication[]> {
	const res = await tx.execute(`
        SELECT
			v.id,
            v.assumptions,
            v.conclusions,
            v.is_equivalence,
            (
                SELECT json_group_object(p.id, p.relation)
                FROM properties p
                WHERE p.id IN (
                    SELECT value FROM json_each(v.assumptions)
                    UNION
                    SELECT value FROM json_each(v.conclusions)
                )
            ) AS relations
        FROM implications_view v
    `)

	const all_implications_db = res.rows as unknown as {
		id: string
		assumptions: string
		conclusions: string
		is_equivalence: number
		relations: string
	}[]

	const implications: NormalizedCategoryImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions: string[] = JSON.parse(impl.assumptions)
		const conclusions: string[] = JSON.parse(impl.conclusions)
		const relations: Record<string, string> = JSON.parse(impl.relations)

		for (const conclusion of conclusions) {
			implications.push({
				id: impl.id,
				assumptions: new Set(assumptions),
				conclusion,
				relations,
			})
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: new Set(conclusions),
					conclusion: assumption,
					relations,
				})
			}
		}
	}

	return implications
}

/**
 * Returns the list of categories saved in the database.
 */
async function get_categories(tx: Transaction) {
	const res = await tx.execute(`
		SELECT id, name, dual_category_id
		FROM categories ORDER BY lower(name)
	`)
	return res.rows as unknown as CategoryMeta[]
}

/**
 * Returns a dictionary of properties saved in the database.
 */
async function get_properties_dict(tx: Transaction) {
	const res = await tx.execute(`
		SELECT p.id, p.dual_property_id
		FROM properties p
		ORDER BY lower(p.id)
	`)
	const rows = res.rows as unknown as PropertyMeta[]

	const dict: Record<string, PropertyMeta> = {}

	for (const p of rows) {
		dict[p.id] = p
	}

	return dict
}

/**
 * Clears all the deduced properties.
 * This runs before the deduction starts.
 */
async function delete_deduced_category_properties(tx: Transaction) {
	await tx.execute(`
		DELETE FROM category_property_assignments
		WHERE is_deduced = TRUE
	`)
}

/**
 * Returns a dictionary with all properties that are satisfied or unsatisfied,
 * grouped by category and value.
 */
async function get_all_decided_properties(tx: Transaction, categories: { id: string }[]) {
	const res = await tx.execute(`
		SELECT property_id, category_id, is_satisfied
		FROM category_property_assignments
	`)

	const rows = res.rows as unknown as {
		property_id: string
		category_id: string
		is_satisfied: boolean
	}[]

	const grouped: Record<string, { satisfied: Set<string>; unsatisfied: Set<string> }> =
		{}

	for (const category of categories) {
		grouped[category.id] = { satisfied: new Set(), unsatisfied: new Set() }
	}

	for (const row of rows) {
		const { property_id, category_id, is_satisfied } = row
		if (is_satisfied) {
			grouped[category_id].satisfied.add(property_id)
		} else {
			grouped[category_id].unsatisfied.add(property_id)
		}
	}

	return grouped
}

/**
 * Deduce satisfied properties for a given category from given ones
 * by using the list of normalized implications.
 */
async function deduce_satisfied_category_properties(
	tx: Transaction,
	category_id: string,
	implications: NormalizedCategoryImplication[],
	satisfied_properties: Set<string>,
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	const deduced_satisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	while (true) {
		const implication = implications.find(
			({ assumptions, conclusion }) =>
				is_subset(assumptions, satisfied_properties) &&
				!satisfied_properties.has(conclusion),
		)
		if (!implication) break

		const { id: implication_id, conclusion } = implication

		satisfied_properties.add(conclusion)
		deduced_satisfied_props.push(conclusion)

		const assumption_string = get_assumption_string(implication)
		const conclusion_string = get_conclusion_string(implication)

		const ref = `(see <a href="/category-implication/${implication_id}">here</a>)`
		const reason = `Since it ${assumption_string}, it ${conclusion_string} ${ref}.`

		reasons[conclusion] = reason
	}

	if (deduced_satisfied_props.length > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (let i = 0; i < deduced_satisfied_props.length; i++) {
			const id = deduced_satisfied_props[i]
			value_fragments.push(`(?, ?, TRUE, ?, ?, TRUE)`)
			values.push(category_id, id, reasons[id], i + 1)
		}

		const insert_sql = options.check_conflicts
			? `INSERT INTO category_property_assignments
				(category_id, property_id, is_satisfied, reason, position, is_deduced)
				VALUES ${value_fragments.join(',\n')}`
			: `INSERT INTO category_property_assignments
				(category_id, property_id, is_satisfied, reason, position, is_deduced)
				VALUES ${value_fragments.join(',\n')}
				ON CONFLICT (category_id, property_id) DO NOTHING`

		try {
			await tx.execute({ sql: insert_sql, args: values })
		} catch (err) {
			if (err instanceof LibsqlError) {
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

	console.info(
		`Deduced ${deduced_satisfied_props.length} satisfied properties for ${category_id}`,
	)
}

/**
 * Deduce unsatisfied properties for a given category from given ones
 * by using the satisfied properties and the list of normalized implications.
 */
async function deduce_unsatisfied_category_properties(
	tx: Transaction,
	category_id: string,
	implications: NormalizedCategoryImplication[],
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	const deduced_unsatisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	function get_next_implication() {
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

	while (true) {
		const next = get_next_implication()
		if (!next) break

		const { implication, property } = next
		const { id: implication_id, relations } = implication

		if (satisfied_properties.has(property)) {
			throw new Error(`Contradiction has been found for: ${property}`)
		}

		unsatisfied_properties.add(property)
		deduced_unsatisfied_props.push(property)

		const assumption_string = get_assumption_string(implication)
		const conclusion_string = get_conclusion_string(implication)

		const ref = `(see <a href="/category-implication/${implication_id}">here</a>)`

		const reason =
			`Assume that it ${relations[property]} ${property}. ` +
			`But since it ${assumption_string}, it ${conclusion_string} ${ref} – contradiction.`

		reasons[property] = reason
	}

	if (deduced_unsatisfied_props.length > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (let i = 0; i < deduced_unsatisfied_props.length; i++) {
			const id = deduced_unsatisfied_props[i]
			value_fragments.push('(?, ?, FALSE, ?, ?, TRUE)')
			values.push(category_id, id, reasons[id], i + 1)
		}

		const insert_query = options.check_conflicts
			? `INSERT INTO category_property_assignments
				(category_id, property_id, is_satisfied, reason, position, is_deduced)
				VALUES ${value_fragments.join(',\n')}`
			: `INSERT INTO category_property_assignments
				(category_id, property_id, is_satisfied, reason, position, is_deduced)
				VALUES ${value_fragments.join(',\n')}
				ON CONFLICT (category_id, property_id) DO NOTHING`

		try {
			await tx.execute({ sql: insert_query, args: values })
		} catch (err) {
			if (err instanceof LibsqlError) {
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

	console.info(
		`Deduced ${deduced_unsatisfied_props.length} unsatisfied properties for ${category_id}`,
	)
}

/**
 * Assign dual properties to dual categories:
 * If C has property P, then C^op has property P^op (if defined).
 */
async function deduce_dual_category_properties(
	tx: Transaction,
	category: CategoryMeta,
	satisfied: Set<string>,
	unsatisfied: Set<string>,
	dual_satisfied: Set<string>,
	dual_unsatisfied: Set<string>,
	properties_dict: Record<string, PropertyMeta>,
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

		await tx.execute({ sql: insert_query, args: values })

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

		await tx.execute({ sql: insert_query, args: values })

		console.info(
			`Deduced ${new_unsatisfied.size} unsatisfied properties by duality for ${category.id}`,
		)
	}
}
