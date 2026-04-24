import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'

type AtomicImplication = { assumptions: string[]; conclusion: string }

export async function check_consistency(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
): Promise<{ consistent: boolean } | null> {
	for (const p of satisfied_properties) {
		if (unsatisfied_properties.has(p)) return { consistent: false }
	}

	const implications = await get_atomic_implications()
	if (!implications) return null

	return check_consistency_worker(
		satisfied_properties,
		unsatisfied_properties,
		implications,
	)
}

function check_consistency_worker(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: AtomicImplication[],
): { consistent: boolean } {
	for (const p of satisfied_properties) {
		if (unsatisfied_properties.has(p)) return { consistent: false }
	}

	const all_satisfied_properties = new Set(satisfied_properties)

	while (true) {
		const implication = implications.find(
			({ assumptions, conclusion }) =>
				assumptions.every((p) => all_satisfied_properties.has(p)) &&
				!all_satisfied_properties.has(conclusion),
		)
		if (!implication) break

		const { conclusion } = implication

		if (unsatisfied_properties.has(conclusion)) return { consistent: false }

		all_satisfied_properties.add(conclusion)
	}

	return { consistent: true }
}

async function get_atomic_implications(): Promise<AtomicImplication[] | null> {
	const { rows: implications, err } = await query<{
		assumptions: string
		conclusions: string
		is_equivalence: number
	}>(sql`
        SELECT assumptions, conclusions, is_equivalence
        FROM category_implications_view
    `)

	if (err) return null

	const atomic_implications: AtomicImplication[] = []

	for (const implication of implications) {
		const assumptions: string[] = JSON.parse(implication.assumptions)
		const conclusions: string[] = JSON.parse(implication.conclusions)

		for (const conclusion of conclusions) {
			atomic_implications.push({
				assumptions: assumptions.slice(),
				conclusion,
			})
		}

		if (implication.is_equivalence) {
			for (const assumption of assumptions) {
				atomic_implications.push({
					assumptions: conclusions.slice(),
					conclusion: assumption,
				})
			}
		}
	}

	return atomic_implications
}

export async function get_missing_combinations() {
	const implications = await get_atomic_implications()
	if (!implications) return null

	const { rows: properties, err } = await query<{
		id: string
		dual_property_id: string | null
	}>(sql`SELECT id, dual_property_id FROM category_properties ORDER BY lower(id)`)

	if (err) return null

	const { rows: existing, err: err_existing } = await query<{
		p: string
		q: string
	}>(sql`
		SELECT DISTINCT cp.property_id AS p, cnp.property_id AS q
		FROM category_property_assignments cp
		INNER JOIN category_property_assignments cnp
		ON cp.category_id = cnp.category_id
		WHERE cp.is_satisfied = TRUE AND cnp.is_satisfied = FALSE
	`)

	if (err_existing) return null

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
