import { get_client, is_subset } from './shared'
import { get_assumption_string, get_conclusion_string } from './deduction.utils'

const db = get_client()

type FunctorMeta = {
	id: string
	name: string
	source: string
	source_props: Set<string>
	target: string
	target_props: Set<string>
}

type NormalizedFunctorImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	source_assumptions: Set<string>
	target_assumptions: Set<string>
}

type FunctorPropertyMeta = {
	id: string
	dual_property_id: string | null
	relation: string
	negation: string
	conditional: string
}

// TODO: remove code duplication with category deduction script
// (not quite the same because we need source and target assumptions)

// TODO: apply the same refactoring here that has been done for categories

/**
 * Deduce properties of functors from given ones
 * by using the list of functor implications.
 */
export function deduce_functor_properties() {
	console.info('\n--- Deduce functor properties ---')

	const implications = get_normalized_functor_implications()
	const functors = get_functors()
	const properties_dict = get_functor_properties_dict()

	const deduction = db.transaction(() => {
		delete_deduced_functor_properties()

		for (const functor of functors) {
			deduce_satisfied_functor_properties(functor, implications, properties_dict)
			deduce_unsatisfied_functor_properties(functor, implications, properties_dict)
		}
	})

	deduction()
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
function get_normalized_functor_implications(): NormalizedFunctorImplication[] {
	const all_implications_db = db
		.prepare(
			`SELECT
				v.id,
				v.assumptions,
				v.source_assumptions,
				v.target_assumptions,
				v.conclusions,
				v.is_equivalence
			FROM functor_implications_view v`,
		)
		.all() as {
		id: string
		assumptions: string
		source_assumptions: string
		target_assumptions: string
		conclusions: string
		is_equivalence: number
	}[]

	const implications: NormalizedFunctorImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions: string[] = JSON.parse(impl.assumptions)
		const conclusions: string[] = JSON.parse(impl.conclusions)
		const source_assumptions: string[] = JSON.parse(impl.source_assumptions)
		const target_assumptions: string[] = JSON.parse(impl.target_assumptions)

		for (const conclusion of conclusions) {
			implications.push({
				id: impl.id,
				assumptions: new Set(assumptions),
				source_assumptions: new Set(source_assumptions),
				target_assumptions: new Set(target_assumptions),
				conclusion,
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
function get_functors() {
	const rows = db
		.prepare(
			`SELECT
				id, name, source, target,
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
			ORDER BY lower(name)`,
		)
		.all() as {
		id: string
		name: string
		source: string
		target: string
		source_props: string
		target_props: string
	}[]

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		source: row.source,
		target: row.target,
		source_props: new Set(JSON.parse(row.source_props as string)),
		target_props: new Set(JSON.parse(row.target_props as string)),
	})) as FunctorMeta[]
}

/**
 * Returns a dictionary of functor properties saved in the database.
 */
function get_functor_properties_dict() {
	const properties = db
		.prepare(
			`SELECT
				p.id, p.dual_property_id, p.relation,
				r.negation, r.conditional
			FROM functor_properties p
			INNER JOIN relations r ON r.relation = p.relation
			ORDER BY lower(p.id)`,
		)
		.all() as FunctorPropertyMeta[]

	const dict: Record<string, FunctorPropertyMeta> = {}

	for (const p of properties) dict[p.id] = p

	return dict
}

/**
 * Clears all the deduced functor properties.
 * This runs before the deduction starts.
 */
function delete_deduced_functor_properties() {
	db.prepare('DELETE FROM functor_property_assignments WHERE is_deduced = TRUE').run()
}

/**
 * Returns the list of properties that are satisfied or unsatisfied
 * for a given functor.
 */
function get_decided_functor_properties(functor_id: string, value: boolean) {
	const rows = db
		.prepare(
			`SELECT property_id
			FROM functor_property_assignments
			WHERE functor_id = ? AND is_satisfied = ?`,
		)
		.all(functor_id, value ? 1 : 0) as { property_id: string }[]

	return new Set(rows.map((row) => row.property_id) as string[])
}

/**
 * Deduce satisfied properties for a given functor from given ones
 * by using the list of normalized implications.
 */
function deduce_satisfied_functor_properties(
	functor: FunctorMeta,
	implications: NormalizedFunctorImplication[],
	properties_dict: Record<string, FunctorPropertyMeta>,
) {
	const satisfied_props = get_decided_functor_properties(functor.id, true)

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

		const assumption_string = get_assumption_string(implication, properties_dict)
		const conclusion_string = get_conclusion_string(implication, properties_dict)

		const ref = `by <a href="/functor-implication/${implication_id}">this result</a>`
		const reason = `Since it ${assumption_string}, it ${conclusion_string} (${ref}).`

		reasons[conclusion] = reason
	}

	if (deduced_satisfied_props.length > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (const id of deduced_satisfied_props) {
			value_fragments.push(`(?, ?, TRUE, ?, TRUE)`)
			values.push(functor.id, id, reasons[id])
		}

		const insert_sql = `
			INSERT INTO functor_property_assignments (
				functor_id, property_id, is_satisfied, reason, is_deduced
			)
			VALUES
			${value_fragments.join(',\n')}
		`

		db.prepare(insert_sql).run(values)
	}

	console.info(
		`Deduced ${deduced_satisfied_props.length} satisfied properties for ${functor.id}`,
	)
}

/**
 * Deduce unsatisfied properties for a given functor from given ones
 * by using the satisfied properties and the list of normalized implications.
 */
function deduce_unsatisfied_functor_properties(
	functor: FunctorMeta,
	implications: NormalizedFunctorImplication[],
	properties_dict: Record<string, FunctorPropertyMeta>,
) {
	const satisfied_props = get_decided_functor_properties(functor.id, true)
	const unsatisfied_props = get_decided_functor_properties(functor.id, false)

	const deduced_unsatisfied_props: string[] = []
	const reasons: Record<string, string> = {}

	function get_next_implication() {
		for (const implication of implications) {
			if (!unsatisfied_props.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!unsatisfied_props.has(p) &&
					is_subset(implication.assumptions, satisfied_props, {
						exception: p,
					}) &&
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
		const { id: implication_id } = implication

		if (satisfied_props.has(property)) {
			throw new Error(`Contradiction has been found for: ${property}`)
		}

		unsatisfied_props.add(property)
		deduced_unsatisfied_props.push(property)

		const assumption_string = get_assumption_string(implication, properties_dict)
		const conclusion_string = get_conclusion_string(implication, properties_dict)

		const has_multiple_assumptions = implication.assumptions.size > 1

		const ref = `by <a href="/functor-implication/${implication_id}">this result</a>`

		const contra = `Assume for contradiction that it ${properties_dict[property].relation} ${property}`

		const reason = has_multiple_assumptions
			? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
			: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`

		reasons[property] = reason
	}

	if (deduced_unsatisfied_props.length > 0) {
		const value_fragments: string[] = []
		const values: (string | number)[] = []

		for (let i = 0; i < deduced_unsatisfied_props.length; i++) {
			const id = deduced_unsatisfied_props[i]
			value_fragments.push('(?, ?, FALSE, ?, TRUE)')
			values.push(functor.id, id, reasons[id])
		}

		const insert_query = `
			INSERT INTO functor_property_assignments (
				functor_id, property_id, is_satisfied, reason, is_deduced
			)
			VALUES
			${value_fragments.join(',\n')}`

		db.prepare(insert_query).run(values)
	}

	console.info(
		`Deduced ${deduced_unsatisfied_props.length} unsatisfied properties for ${functor.id}`,
	)
}
