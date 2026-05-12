import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { is_subset } from './utils'

// TODO: If possible, remove the code duplication with deduction and redundancy scripts.

type NormalizedCategoryImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

export function check_consistency(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
): { consistent: boolean } {
	for (const p of satisfied_properties) {
		if (unsatisfied_properties.has(p)) return { consistent: false }
	}

	const implications = get_normalized_category_implications()

	return check_consistency_worker(
		satisfied_properties,
		unsatisfied_properties,
		implications,
	)
}

function check_consistency_worker(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
): { consistent: boolean } {
	for (const p of satisfied_properties) {
		if (unsatisfied_properties.has(p)) return { consistent: false }
	}

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

		if (unsatisfied_properties.has(implication.conclusion)) {
			return { consistent: false }
		}

		deduced_satisfied_properties.add(implication.conclusion)
	}

	return { consistent: true }
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

			const { consistent } = check_consistency_worker(
				new Set([p.id]),
				new Set([q.id]),
				implications,
			)

			if (consistent) missing_pairs.push([p.id, q.id])
		}
	}

	return missing_pairs
}
