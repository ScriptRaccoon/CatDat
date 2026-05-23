import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { is_subset } from './utils'
import type { SqliteError } from 'better-sqlite3'
import {
	get_normalized_implications,
	stringify_implication,
	type NormalizedImplication,
} from './implications'
import type { StructureType } from '$lib/commons/types'

// TODO: If possible, remove the code duplication with deduction and redundancy scripts.

export function get_contradiction(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	type: StructureType,
): { contradiction: string[] | null; err: SqliteError | null } {
	for (const p of satisfied_properties) {
		const contradiction = [`${p} ⟹ ${p}`]
		if (unsatisfied_properties.has(p)) return { contradiction, err: null }
	}

	const { implications, err } = get_normalized_implications(type)

	if (err) return { contradiction: null, err }

	const contradiction = contradiction_worker(
		satisfied_properties,
		unsatisfied_properties,
		implications,
	)

	return { contradiction, err: null }
}

function contradiction_worker(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedImplication[],
): string[] | null {
	for (const p of satisfied_properties) {
		if (unsatisfied_properties.has(p)) return [`${p} ⟹ ${p}`]
	}

	const deduction_dict: Record<string, NormalizedImplication> = {}
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

	return build_shortest_proof(
		satisfied_properties,
		deduction_dict,
		contradictory_property,
	)
}

function build_shortest_proof(
	satisfied_properties: Set<string>,
	deduction_dict: Record<string, NormalizedImplication>,
	target_property: string,
) {
	const proof: string[] = []

	const visited_properties = new Set<string>()

	function derive(property: string) {
		if (visited_properties.has(property)) return
		if (satisfied_properties.has(property)) return
		visited_properties.add(property)

		const implication = deduction_dict[property]
		if (!implication) throw new Error(`Missing deduction for property: ${property}`)

		for (const p of implication.assumptions) derive(p)

		proof.push(stringify_implication(implication))
	}

	derive(target_property)

	return proof
}

export function get_missing_combinations() {
	const { implications, err: err_imp } = get_normalized_implications('category')

	if (err_imp) return { err: err_imp, missing_combinations: [] }

	const { rows: properties, err } = query<{
		id: string
		dual_property_id: string | null
	}>(sql`SELECT id, dual_property_id FROM category_properties ORDER BY lower(id)`)

	if (err) return { err, missing_combinations: [] }

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

	if (err_existing) return { err: err_existing, missing_combinations: [] }

	const witnessed_pairs = new Set(existing.map(({ p, q }) => `${p}|${q}`))

	const missing_combinations: [string, string][] = []

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

			if (!contradiction) missing_combinations.push([p.id, q.id])
		}
	}

	return { missing_combinations, err: null }
}
