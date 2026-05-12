import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { is_subset } from './utils'

// TODO: If possible, remove the code duplication with deduction and redundancy scripts.

type NormalizedCategoryImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

export function get_contradiction(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
): string[] | null {
	for (const p of satisfied_properties) {
		if (unsatisfied_properties.has(p))
			return [`${p} cannot be both satisfied and unsatisfied`]
	}

	const implications = get_normalized_category_implications()

	return contradiction_worker(
		satisfied_properties,
		unsatisfied_properties,
		implications,
	)
}

function contradiction_worker(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
): string[] | null {
	for (const p of satisfied_properties) {
		if (unsatisfied_properties.has(p)) {
			return [`${p} cannot be both satisfied and unsatisfied`]
		}
	}

	let contradictory_property: string | null = null

	const used_implications: {
		implication: NormalizedCategoryImplication
		relevant: boolean
	}[] = []

	const deduced_satisfied_properties = new Set(satisfied_properties)

	function get_next_implication() {
		for (const implication of implications) {
			const is_valid =
				is_subset(implication.assumptions, deduced_satisfied_properties) &&
				!deduced_satisfied_properties.has(implication.conclusion)
			if (is_valid) return implication
		}
		return null
	}

	while (true) {
		const implication = get_next_implication()
		if (!implication) break

		used_implications.push({ implication, relevant: false })
		deduced_satisfied_properties.add(implication.conclusion)

		if (unsatisfied_properties.has(implication.conclusion)) {
			contradictory_property = implication.conclusion
			break
		}
	}

	if (!contradictory_property) return null

	// remove irrelevant implications

	const relevant_properties = new Set([contradictory_property])

	for (let i = used_implications.length - 1; i >= 0; i--) {
		const { implication } = used_implications[i]
		const is_relevant = relevant_properties.has(implication.conclusion)

		if (is_relevant) {
			used_implications[i].relevant = is_relevant
			for (const p of implication.assumptions) {
				if (!satisfied_properties.has(p)) relevant_properties.add(p)
			}
		}
	}

	const relevant_implications = used_implications
		.filter((item) => item.relevant)
		.map((item) => item.implication)

	const contradiction: string[] = []

	for (let i = 0; i < relevant_implications.length; i++) {
		const implication = relevant_implications[i]
		let segment = `${[...implication.assumptions].join(' ∧ ')} ⟹ ${implication.conclusion}`
		if (i === relevant_implications.length - 1) segment += ` ↯`
		contradiction.push(segment)
	}

	return contradiction
}

function get_normalized_category_implications() {
	const { rows, err } = query<{
		id: string
		assumptions: string
		conclusions: string
		is_equivalence: number
	}>(
		sql`SELECT id, assumptions, conclusions, is_equivalence FROM category_implications_view`,
	)

	if (err) throw err

	const implications: NormalizedCategoryImplication[] = []

	for (const impl of rows) {
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

export function get_missing_combinations() {
	const implications = get_normalized_category_implications()

	const { rows: properties, err } = query<{
		id: string
		dual_property_id: string | null
	}>(sql`SELECT id, dual_property_id FROM category_properties ORDER BY lower(id)`)

	if (err) throw err

	const { rows: existing, err: err_existing } = query<{
		p: string
		q: string
	}>(sql`
		SELECT DISTINCT cp.property_id AS p, cnp.property_id AS q
		FROM category_property_assignments cp
		INNER JOIN category_property_assignments cnp
		ON cp.category_id = cnp.category_id
		WHERE cp.is_satisfied = TRUE AND cnp.is_satisfied = FALSE
	`)

	if (err_existing) throw err_existing

	const witnessed_pairs = new Set(existing.map(({ p, q }) => `${p}|${q}`))

	const missing_pairs: [string, string][] = []

	for (const p of properties) {
		for (const q of properties) {
			if (p.id === q.id) continue

			if (witnessed_pairs.has(`${p.id}|${q.id}`)) continue

			if (
				p.dual_property_id &&
				q.dual_property_id &&
				witnessed_pairs.has(`${p.dual_property_id}|${q.dual_property_id}`)
			) {
				continue
			}

			const contradiction = contradiction_worker(
				new Set([p.id]),
				new Set([q.id]),
				implications,
			)

			if (!contradiction) missing_pairs.push([p.id, q.id])
		}
	}

	return missing_pairs
}
