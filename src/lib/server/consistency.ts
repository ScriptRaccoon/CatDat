import { deduce_properties } from '$shared/deduction.utils'
import type { StructureType } from '$lib/commons/types'
import {
	get_normalized_implications,
	type NormalizedImplication,
	stringify_implication
} from '$shared/implications'
import { db } from './db'

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

	const { proofs, stop_property } = deduce_properties(
		satisfied_properties,
		implications,
		(implication) => ({
			proof: implication,
			stop: unsatisfied_properties.has(implication.conclusion)
		})
	)

	if (!stop_property) return null

	return build_shortest_proof(satisfied_properties, proofs, stop_property)
}

function build_shortest_proof(
	satisfied_properties: Set<string>,
	proofs: Partial<Record<string, NormalizedImplication>>,
	target_property: string
) {
	const proof: string[] = []

	const visited_properties = new Set<string>()

	function derive(property: string) {
		if (visited_properties.has(property)) return
		if (satisfied_properties.has(property)) return
		visited_properties.add(property)

		const implication = proofs[property]
		if (!implication) throw new Error(`Missing deduction for property: ${property}`)

		for (const p of implication.assumptions) derive(p)

		proof.push(stringify_implication(implication))
	}

	derive(target_property)

	return proof
}
