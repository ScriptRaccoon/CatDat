export function are_equal_sets<T>(a: Set<T>, b: Set<T>) {
	return a.size === b.size && [...a].every((el) => b.has(el))
}

export function is_subset<T>(a: Set<T>, b: Set<T>, exception?: T) {
	for (const x of a) {
		if (x !== exception && !b.has(x)) return false
	}
	return true
}

type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	relations: Record<string, string>
}

export type NormalizedCategoryImplication = NormalizedImplication

export type NormalizedFunctorImplication = NormalizedImplication & {
	source_assumptions: Set<string>
	target_assumptions: Set<string>
}

export function get_assumption_string(implication: NormalizedImplication): string {
	const { assumptions, relations } = implication
	return Array.from(assumptions)
		.map((assumption) => `${relations[assumption]} ${assumption}`)
		.join(' and ')
}

export function get_conclusion_string(implication: NormalizedImplication): string {
	const { conclusion, relations } = implication
	return `${relations[conclusion]} ${conclusion}`
}
