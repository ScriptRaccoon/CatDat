import { is_subset } from '$shared/utils'
import type { StructureType } from '$lib/commons/types'
import {
	get_normalized_implications,
	type NormalizedImplication
} from '$shared/implications'
import { db } from './db'

// TODO: If possible, remove the code duplication with deduction and redundancy scripts.

export function get_contradiction(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	type: StructureType
): { contradiction: string[] | null } {
	for (const p of satisfied_properties) {
		const contradiction = [`${p} ⟹ ${p}`]
		if (unsatisfied_properties.has(p)) return { contradiction }
	}

	const implications = get_normalized_implications(db, type).filter(
		(impl) => !impl.mapped_assumptions
	)

	const contradiction = contradiction_worker(
		satisfied_properties,
		unsatisfied_properties,
		implications
	)

	return { contradiction }
}

export function contradiction_worker(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedImplication[]
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
		contradictory_property
	)
}

function build_shortest_proof(
	satisfied_properties: Set<string>,
	deduction_dict: Record<string, NormalizedImplication>,
	target_property: string
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

function stringify_implication(implication: NormalizedImplication) {
	return `${[...implication.assumptions].join(' ∧ ')} ⟹ ${implication.conclusion}`
}
