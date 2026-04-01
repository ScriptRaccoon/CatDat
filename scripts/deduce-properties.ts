import type { Transaction, Client } from '@libsql/client'
import dotenv from 'dotenv'
import {
	get_assumption_string,
	get_conclusion_string,
	get_normalized_implications,
	NormalizedImplication,
} from './implication.utils'

dotenv.config({ quiet: true })

type CategoryMeta = {
	id: string
	name: string
	dual_category_id: string | null
}

export async function deduce_all_properties(db: Client) {
	const tx = await db.transaction()

	try {
		const implications = await get_normalized_implications(tx)
		if (!implications) return

		const categories = await get_categories(tx)

		for (const category of categories) {
			await delete_deduced_properties(tx, category.id)
			await deduce_satisfied_properties(tx, category.id, implications)
			await deduce_unsatisfied_properties(tx, category.id, implications)
		}

		for (const category of categories) {
			await deduce_dual_properties(tx, category)
		}

		await tx.commit()
	} catch (err) {
		console.error(err)
		await tx.rollback()
		throw err
	}
}

async function get_categories(tx: Transaction) {
	const res = await tx.execute(`
		SELECT id, name, dual_category_id
		FROM categories ORDER BY lower(name)
	`)
	return res.rows as unknown as CategoryMeta[]
}

async function delete_deduced_properties(tx: Transaction, category_id: string) {
	await tx.execute({
		sql: `
			DELETE FROM category_property_assignments
			WHERE category_id = ? AND is_deduced = TRUE
		`,
		args: [category_id],
	})
}

async function deduce_dual_properties(tx: Transaction, category: CategoryMeta) {
	const allowed =
		category.dual_category_id !== null &&
		category.name.toLowerCase().startsWith('dual') // prevent circular deduction

	if (!allowed) return

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
			WHERE a.category_id = ? AND p.dual_property_id IS NOT NULL
			ORDER BY lower(p.dual_property_id)
		`,
		args: [category.id, category.dual_category_id],
	})

	console.info(
		`Added ${res.rowsAffected} (un-)satisfied properties for ${category.id} to the database by using its dual ${category.dual_category_id}`,
	)
}

async function deduce_satisfied_properties(
	tx: Transaction,
	category_id: string,
	implications: NormalizedImplication[],
) {
	const satisfied_res = await tx.execute({
		sql: `
			SELECT property_id
			FROM category_property_assignments
			WHERE
				category_id = ?
				AND is_satisfied = TRUE
				AND is_deduced = FALSE
		`,
		args: [category_id],
	})

	const satisfied_props = new Set(
		satisfied_res.rows.map((row) => row.property_id) as string[],
	) as Set<string>

	const deduced_satisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	while (true) {
		const implication = implications.find(
			({ assumptions, conclusion }) =>
				[...assumptions].every((p) => satisfied_props.has(p)) &&
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

		const insert_sql = `
			INSERT INTO category_property_assignments (
				category_id, property_id, is_satisfied, reason, position, is_deduced
			)
			VALUES
			${value_fragments.join(',\n')}
		`

		await tx.execute({ sql: insert_sql, args: values })
	}

	console.info(
		`Added ${deduced_satisfied_props.length} satisfied properties for ${category_id} to the database`,
	)
}

async function deduce_unsatisfied_properties(
	tx: Transaction,
	category_id: string,
	implications: NormalizedImplication[],
) {
	const satisfied_res = await tx.execute({
		sql: `
			SELECT property_id
			FROM category_property_assignments
			WHERE category_id = ? AND is_satisfied = TRUE
		`,
		args: [category_id],
	})

	const satisfied_props = new Set(
		satisfied_res.rows.map((row) => row.property_id) as string[],
	)

	const unsatisfied_res = await tx.execute({
		sql: `
			SELECT property_id
			FROM category_property_assignments
			WHERE
				category_id = ?
				AND is_satisfied = FALSE
				AND is_deduced = FALSE
		`,
		args: [category_id],
	})

	const unsatisfied_props = new Set(
		unsatisfied_res.rows.map((row) => row.property_id) as string[],
	)

	const deduced_unsatisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	function get_next_implication() {
		for (const implication of implications) {
			if (!unsatisfied_props.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!unsatisfied_props.has(p) &&
					[...implication.assumptions].every(
						(q) => q === p || satisfied_props.has(q),
					)
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

		const insert_query = `
			INSERT INTO category_property_assignments (
				category_id, property_id, is_satisfied, reason, position, is_deduced
			)
			VALUES
			${value_fragments.join(',\n')}`

		await tx.execute({ sql: insert_query, args: values })
	}

	console.info(
		`Added ${deduced_unsatisfied_props.length} unsatisfied properties for ${category_id} to the database`,
	)
}
