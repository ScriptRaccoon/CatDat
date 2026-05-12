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
		if (unsatisfied_properties.has(p)) return [`${p} ⟹ ${p}`]
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
		if (unsatisfied_properties.has(p)) return [`${p} ⟹ ${p}`]
	}

	const deduction_dict: Record<string, NormalizedCategoryImplication> = {}
	const deduced_satisfied_properties = new Set(satisfied_properties)

	// bfs to find contradiction

	let contradictory_property: string | null = null

	while (!contradictory_property) {
		const new_properties = new Set<string>()

		for (const implication of implications) {
			const is_valid =
				is_subset(implication.assumptions, deduced_satisfied_properties) &&
				!deduced_satisfied_properties.has(implication.conclusion) &&
				!new_properties.has(implication.conclusion)
			if (!is_valid) continue

			new_properties.add(implication.conclusion)
			deduction_dict[implication.conclusion] = implication

			if (unsatisfied_properties.has(implication.conclusion)) {
				contradictory_property = implication.conclusion
				break
			}
		}

		if (!new_properties.size) break

		for (const p of new_properties) deduced_satisfied_properties.add(p)
	}

	if (!contradictory_property) return null

	// build minimal contradiction proof

	const contradiction: string[] = []

	const visited_properties = new Set<string>()

	function build_proof(property: string) {
		if (visited_properties.has(property)) return
		if (satisfied_properties.has(property)) return
		visited_properties.add(property)

		const implication = deduction_dict[property]
		if (!implication) throw new Error(`Missing deduction for property: ${property}`)

		for (const p of implication.assumptions) build_proof(p)

		contradiction.push(stringify_implication(implication))
	}

	build_proof(contradictory_property)

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

function stringify_implication(implication: NormalizedCategoryImplication) {
	return `${[...implication.assumptions].join(' ∧ ')} ⟹ ${implication.conclusion}`
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
