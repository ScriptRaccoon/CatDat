import { type NormalizedImplication } from './implications'
import { is_subset } from './utils'

export function deduce_properties<ProofType>(
	satisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	on_discover: (implication: NormalizedImplication) => {
		proof: ProofType
		stop: boolean
	},
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
) {
	const found = new Set<string>()
	const proofs: Partial<Record<string, ProofType>> = {}
	const deduced_satisfied_properties = new Set(satisfied_properties)

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			const is_valid =
				is_subset(implication.assumptions, deduced_satisfied_properties) &&
				!deduced_satisfied_properties.has(implication.conclusion) &&
				!newly_found.has(implication.conclusion)

			if (!is_valid) continue

			if (!is_applicable(implication, associated_satisfied_properties)) continue

			newly_found.add(implication.conclusion)
			found.add(implication.conclusion)

			const { proof, stop } = on_discover(implication)

			proofs[implication.conclusion] = proof

			if (stop) {
				for (const p of newly_found) deduced_satisfied_properties.add(p)
				return {
					deduced_satisfied_properties,
					found,
					proofs,
					stop_property: implication.conclusion
				}
			}
		}

		for (const p of newly_found) deduced_satisfied_properties.add(p)

		if (!newly_found.size) break
	}

	return { deduced_satisfied_properties, found, proofs }
}

export function refute_properties<ProofType>(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	on_discover: (
		implication: NormalizedImplication,
		property: string
	) => { proof: ProofType; stop: boolean },
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
) {
	const found = new Set<string>()
	const proofs: Partial<Record<string, ProofType>> = {}
	const deduced_unsatisfied_properties = new Set(unsatisfied_properties)

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			if (!deduced_unsatisfied_properties.has(implication.conclusion)) continue

			for (const property of implication.assumptions) {
				const is_valid =
					!deduced_unsatisfied_properties.has(property) &&
					!newly_found.has(property) &&
					is_subset(implication.assumptions, satisfied_properties, {
						exception: property
					})

				if (!is_valid) continue

				if (!is_applicable(implication, associated_satisfied_properties)) continue

				if (satisfied_properties.has(property)) {
					throw new Error(`Contradiction has been found for: ${property}`)
				}

				newly_found.add(property)
				found.add(property)

				const discovery = on_discover(implication, property)

				if (discovery.proof !== undefined) {
					proofs[property] = discovery.proof
				}

				if (discovery.stop) {
					for (const p of newly_found) deduced_unsatisfied_properties.add(p)
					return {
						deduced_unsatisfied_properties,
						found,
						proofs,
						stop_property: property
					}
				}
			}
		}

		for (const property of newly_found) deduced_unsatisfied_properties.add(property)

		if (!newly_found.size) break
	}

	return { deduced_unsatisfied_properties, found, proofs }
}

function is_applicable(
	implication: NormalizedImplication,
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
) {
	return (
		!implication.associated_assumptions ||
		Object.keys(implication.associated_assumptions).every((key) => {
			return is_subset(
				implication.associated_assumptions?.[key] ?? new Set(),
				associated_satisfied_properties?.[key] ?? new Set()
			)
		})
	)
}

/**
 * Deduces properties from the satisfied ones until one of them satisfies
 * the given predicate. Returns the implications used for its deduction,
 * in the order in which they are applied, or null if no such property
 * can be deduced.
 */
export function find_deduction(
	satisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	is_target: (property: string) => boolean,
	associated_satisfied_properties?: Partial<Record<string, Set<string>>>
): NormalizedImplication[] | null {
	const { proofs, stop_property } = deduce_properties(
		satisfied_properties,
		implications,
		(implication) => ({
			proof: implication,
			stop: is_target(implication.conclusion)
		}),
		associated_satisfied_properties
	)

	if (!stop_property) return null

	return trace_deduction(satisfied_properties, proofs, stop_property)
}

/**
 * Traces back the deduction of a property from the satisfied properties
 * and returns the implications used, in the order in which they are applied.
 */
function trace_deduction(
	satisfied_properties: Set<string>,
	proofs: Partial<Record<string, NormalizedImplication>>,
	target_property: string
) {
	const used_implications: NormalizedImplication[] = []

	const visited_properties = new Set<string>()

	function derive(property: string) {
		if (visited_properties.has(property)) return
		if (satisfied_properties.has(property)) return
		visited_properties.add(property)

		const implication = proofs[property]
		if (!implication) throw new Error(`Missing deduction for property: ${property}`)

		for (const p of implication.assumptions) derive(p)

		used_implications.push(implication)
	}

	derive(target_property)

	return used_implications
}

/**
 * Returns the given associated assumptions (e.g. "the domain
 * is complete"), each closed under the implications of the associated
 * structure type (e.g. "the domain has products").
 */
export function close_associated_assumptions(
	associated_assumptions: Partial<Record<string, Set<string>>> | undefined,
	associated_implications: Record<string, NormalizedImplication[]>
) {
	if (!associated_assumptions) return undefined

	const closed: Partial<Record<string, Set<string>>> = {}

	for (const [label, properties] of Object.entries(associated_assumptions)) {
		if (!properties) continue
		closed[label] = deduce_properties(
			properties,
			associated_implications[label] ?? [],
			() => ({ proof: null, stop: false })
		).deduced_satisfied_properties
	}

	return closed
}
