import type { Transaction, Client } from '@libsql/client'
import {
	get_assumption_string,
	get_conclusion_string,
	is_subset,
	NormalizedFunctorImplication,
} from './shared'

type FunctorMeta = {
	id: string
	name: string
	source: string
	source_props: Set<string>
	target: string
	target_props: Set<string>
}

// TODO: remove code duplication with category deduction script
// (not quite the same because we need source and target assumptions)

/**
 * Deduce properties of functor from given ones
 * by using the list of functor implications.
 */
export async function deduce_functor_properties(db: Client) {
	console.info('\n--- Deduce functor properties ---')
	const tx = await db.transaction()

	try {
		const implications = await get_normalized_functor_implications(tx)

		const functors = await get_functors(tx)

		for (const functor of functors) {
			await delete_deduced_functor_properties(tx, functor)
			await deduce_satisfied_functor_properties(tx, functor, implications)
			await deduce_unsatisfied_functor_properties(tx, functor, implications)
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
async function get_normalized_functor_implications(
	tx: Transaction,
): Promise<NormalizedFunctorImplication[]> {
	const res = await tx.execute(`
        SELECT
			v.id,
            v.assumptions,
			v.source_assumptions,
			v.target_assumptions,
            v.conclusions,
            v.is_equivalence,
            (
                SELECT json_group_object(p.id, p.relation)
                FROM functor_properties p
                WHERE p.id IN (
                    SELECT value FROM json_each(v.assumptions)
                    UNION
                    SELECT value FROM json_each(v.conclusions)
                )
            ) AS relations
        FROM functor_implications_view v
    `)

	const all_implications_db = res.rows as unknown as {
		id: string
		assumptions: string
		source_assumptions: string
		target_assumptions: string
		conclusions: string
		is_equivalence: number
		relations: string
	}[]

	const implications: NormalizedFunctorImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions: string[] = JSON.parse(impl.assumptions)
		const conclusions: string[] = JSON.parse(impl.conclusions)
		const source_assumptions: string[] = JSON.parse(impl.source_assumptions)
		const target_assumptions: string[] = JSON.parse(impl.target_assumptions)
		const relations: Record<string, string> = JSON.parse(impl.relations)

		for (const conclusion of conclusions) {
			implications.push({
				id: impl.id,
				assumptions: new Set(assumptions),
				source_assumptions: new Set(source_assumptions),
				target_assumptions: new Set(target_assumptions),
				conclusion,
				relations,
			})
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: new Set(conclusions),
					source_assumptions: new Set(source_assumptions),
					target_assumptions: new Set(target_assumptions),
					conclusion: assumption,
					relations,
				})
			}
		}
	}

	return implications
}

/**
 * Returns the list of functors saved in the database along with
 * the satisfied properties of their source and target category.
 */
async function get_functors(tx: Transaction) {
	const res = await tx.execute(`
		SELECT
			id,
			name,
			source,
			target,
			(
				SELECT json_group_array(property_id) FROM (
					SELECT property_id
					FROM category_property_assignments
					WHERE category_id = source AND is_satisfied = TRUE
				)
			) as source_props,
			(
				SELECT json_group_array(property_id) FROM (
					SELECT property_id
					FROM category_property_assignments
					WHERE category_id = target AND is_satisfied = TRUE
				)
			) as target_props
		FROM functors
		ORDER BY lower(name)
	`)

	return res.rows.map((row) => ({
		id: row.id,
		name: row.name,
		source: row.source,
		target: row.target,
		source_props: new Set(JSON.parse(row.source_props as string)),
		target_props: new Set(JSON.parse(row.target_props as string)),
	})) as FunctorMeta[]
}

/**
 * Clears all the deduced functor properties.
 * This runs before the deduction starts.
 */
async function delete_deduced_functor_properties(tx: Transaction, functor: FunctorMeta) {
	await tx.execute({
		sql: `
			DELETE FROM functor_property_assignments
			WHERE functor_id = ? AND is_deduced = TRUE
		`,
		args: [functor.id],
	})
}

/**
 * Returns the list of properties that are satisfied or unsatisfied
 * for a given functor.
 */
async function get_decided_functor_properties(
	tx: Transaction,
	functor_id: string,
	value: boolean,
) {
	const res = await tx.execute({
		sql: `
			SELECT property_id
			FROM functor_property_assignments
			WHERE functor_id = ? AND is_satisfied = ?
		`,
		args: [functor_id, value],
	})

	return new Set(res.rows.map((row) => row.property_id) as string[])
}

/**
 * Deduce satisfied properties for a given functor from given ones
 * by using the list of normalized implications.
 */
async function deduce_satisfied_functor_properties(
	tx: Transaction,
	functor: FunctorMeta,
	implications: NormalizedFunctorImplication[],
) {
	const satisfied_props = await get_decided_functor_properties(tx, functor.id, true)

	const deduced_satisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	while (true) {
		const implication = implications.find(
			({ assumptions, conclusion, source_assumptions, target_assumptions }) =>
				is_subset(assumptions, satisfied_props) &&
				!satisfied_props.has(conclusion) &&
				is_subset(source_assumptions, functor.source_props) &&
				is_subset(target_assumptions, functor.target_props),
		)
		if (!implication) break

		const { id: implication_id, conclusion } = implication

		satisfied_props.add(conclusion)
		deduced_satisfied_props.push(conclusion)

		const assumption_string = get_assumption_string(implication)
		const conclusion_string = get_conclusion_string(implication)

		const ref = `(see <a href="/functor-implication/${implication_id}">here</a>)`
		const reason = `Since it ${assumption_string}, it ${conclusion_string} ${ref}.`

		reasons[conclusion] = reason
	}

	if (deduced_satisfied_props.length > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (let i = 0; i < deduced_satisfied_props.length; i++) {
			const id = deduced_satisfied_props[i]
			value_fragments.push(`(?, ?, TRUE, ?, ?, TRUE)`)
			values.push(functor.id, id, reasons[id], i + 1)
		}

		const insert_sql = `
			INSERT INTO functor_property_assignments (
				functor_id, property_id, is_satisfied, reason, position, is_deduced
			)
			VALUES
			${value_fragments.join(',\n')}
		`

		await tx.execute({ sql: insert_sql, args: values })
	}

	console.info(
		`Deduced ${deduced_satisfied_props.length} satisfied properties for ${functor.id}`,
	)
}

/**
 * Deduce unsatisfied properties for a given functor from given ones
 * by using the satisfied properties and the list of normalized implications.
 */
async function deduce_unsatisfied_functor_properties(
	tx: Transaction,
	functor: FunctorMeta,
	implications: NormalizedFunctorImplication[],
) {
	const satisfied_props = await get_decided_functor_properties(tx, functor.id, true)
	const unsatisfied_props = await get_decided_functor_properties(tx, functor.id, false)

	const deduced_unsatisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	function get_next_implication() {
		for (const implication of implications) {
			if (!unsatisfied_props.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!unsatisfied_props.has(p) &&
					is_subset(implication.assumptions, satisfied_props, p) &&
					is_subset(implication.source_assumptions, functor.source_props) &&
					is_subset(implication.target_assumptions, functor.target_props)

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

		const ref = `(see <a href="/functor-implication/${implication_id}">here</a>)`

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
			values.push(functor.id, id, reasons[id], i + 1)
		}

		const insert_query = `
			INSERT INTO functor_property_assignments (
				functor_id, property_id, is_satisfied, reason, position, is_deduced
			)
			VALUES
			${value_fragments.join(',\n')}`

		await tx.execute({ sql: insert_query, args: values })
	}

	console.info(
		`Deduced ${deduced_unsatisfied_props.length} unsatisfied properties for ${functor.id}`,
	)
}
