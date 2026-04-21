import type { Transaction, Client } from '@libsql/client'
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

/**
 * Deduce properties of categories from given ones
 * by using the list of implications.
 */
export async function deduce_category_properties(db: Client) {
	const tx = await db.transaction()

	try {
		const implications = await get_normalized_category_implications(tx)
		const categories = await get_categories(tx)

		await delete_deduced_category_properties(tx)

		for (const category of categories) {
			await deduce_satisfied_category_properties(tx, category.id, implications)
			await deduce_unsatisfied_category_properties(tx, category.id, implications)
		}

		for (const category of categories) {
			const allowed =
				category.dual_category_id !== null &&
				category.name.toLowerCase().startsWith('dual') // prevent circular deduction

			if (!allowed) continue

			await deduce_dual_category_properties(tx, category)
			await deduce_satisfied_category_properties(tx, category.id, implications, {
				check_conflicts: false,
			})
			await deduce_unsatisfied_category_properties(tx, category.id, implications, {
				check_conflicts: false,
			})
		}

		await tx.commit()
	} catch (err) {
		console.error(err)
		await tx.rollback()
		throw err
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
 * Returns the list of properties that are satisfied or unsatisfied
 * for a given category.
 */
async function get_decided_properties(
	tx: Transaction,
	category_id: string,
	value: boolean,
) {
	const res = await tx.execute({
		sql: `
			SELECT property_id
			FROM category_property_assignments
			WHERE category_id = ? AND is_satisfied = ?
		`,
		args: [category_id, value],
	})

	return new Set(res.rows.map((row) => row.property_id) as string[])
}

/**
 * Deduce satisfied properties for a given category from given ones
 * by using the list of normalized implications.
 */
async function deduce_satisfied_category_properties(
	tx: Transaction,
	category_id: string,
	implications: NormalizedCategoryImplication[],
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	const satisfied_props = await get_decided_properties(tx, category_id, true)

	const deduced_satisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	while (true) {
		const implication = implications.find(
			({ assumptions, conclusion }) =>
				is_subset(assumptions, satisfied_props) &&
				!satisfied_props.has(conclusion),
		)
		if (!implication) break

		const { id: implication_id, conclusion } = implication

		satisfied_props.add(conclusion)
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

		await tx.execute({ sql: insert_sql, args: values })
	}

	console.info(
		`Added ${deduced_satisfied_props.length} satisfied properties for category ${category_id} to the database`,
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
	options: { check_conflicts: boolean } = { check_conflicts: true },
) {
	const satisfied_props = await get_decided_properties(tx, category_id, true)
	const unsatisfied_props = await get_decided_properties(tx, category_id, false)

	const deduced_unsatisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	function get_next_implication() {
		for (const implication of implications) {
			if (!unsatisfied_props.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!unsatisfied_props.has(p) &&
					is_subset(implication.assumptions, satisfied_props, p)
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

		if (satisfied_props.has(property)) {
			throw new Error(`Contradiction has been found for: ${property}`)
		}

		unsatisfied_props.add(property)
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

		await tx.execute({ sql: insert_query, args: values })
	}

	console.info(
		`Added ${deduced_unsatisfied_props.length} unsatisfied properties for category ${category_id} to the database`,
	)
}

/**
 * Assign dual properties to dual categories:
 * If C has property P, then C^op has property P^op (if defined).
 */
async function deduce_dual_category_properties(tx: Transaction, category: CategoryMeta) {
	const res = await tx.execute({
		sql: `
			INSERT OR REPLACE INTO category_property_assignments
				(category_id, property_id, is_satisfied, reason, is_deduced)
			SELECT
				?,
				p.dual_property_id,
				a.is_satisfied,
				CASE
					WHEN a.is_satisfied THEN
					'Its dual category ' || r.relation || ' ' || a.property_id || '.'
					ELSE
					'Its dual category ' || r.negation || ' ' || a.property_id || '.'
				END,
				TRUE
			FROM category_property_assignments a
			INNER JOIN properties p ON p.id = a.property_id
			INNER JOIN relations r ON r.relation= p.relation
			WHERE
				a.category_id = ?
				AND p.dual_property_id IS NOT NULL				
			ORDER BY lower(p.dual_property_id)
		`,
		args: [category.id, category.dual_category_id],
	})

	console.info(
		`Added ${res.rowsAffected} (un-)satisfied properties for category ${category.id} to the database by using its dual ${category.dual_category_id}`,
	)
}
