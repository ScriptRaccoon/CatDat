import { is_subset } from './helpers'

type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

type PropertyMeta = {
	id: string
	dual_property_id: string | null
	relation: string
	negation: string
	conditional: string
}

export function get_assumption_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { assumptions } = implication

	return Array.from(assumptions)
		.map(
			(assumption) =>
				`${properties_dict[assumption][conditional ? 'conditional' : 'relation']} ${assumption}`,
		)
		.join(' and ')
}

export function get_conclusion_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { conclusion } = implication

	return `${properties_dict[conclusion][conditional ? 'conditional' : 'relation']} ${conclusion}`
}

function get_reason_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
) {
	const assumption_string = get_assumption_string(implication, properties_dict)
	const conclusion_string = get_conclusion_string(implication, properties_dict)

	const ref = `by <a href="/category-implication/${implication.id}">this result</a>`
	return `Since it ${assumption_string}, it ${conclusion_string} (${ref}).`
}

function get_contradiction_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	property: string,
) {
	const assumption_string = get_assumption_string(implication, properties_dict, true)
	const conclusion_string = get_conclusion_string(implication, properties_dict, true)

	const has_multiple_assumptions = implication.assumptions.size > 1

	const ref = `by <a href="/category-implication/${implication.id}">this result</a>`

	const contra = `Assume for contradiction that it ${properties_dict[property].relation} ${property}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}

/**
 * Returns the set of satisfied properties that can be deduced from a set
 * of satisfied properties, based on a list of normalized implications. If a
 * property dictionary is provided, human-readable reasons are generated as well.
 */
export function get_deduced_satisfied_properties(
	satisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	options: {
		properties_dict?: Record<string, PropertyMeta>
		stop_when_found?: string
	},
) {
	const found = new Set<string>()
	const reasons: Record<string, string> = {}
	const deduced_satisfied_properties = new Set(satisfied_properties)

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			const is_valid =
				is_subset(implication.assumptions, deduced_satisfied_properties) &&
				!deduced_satisfied_properties.has(implication.conclusion) &&
				!newly_found.has(implication.conclusion)

			if (!is_valid) continue

			newly_found.add(implication.conclusion)
			found.add(implication.conclusion)

			if (options?.stop_when_found === implication.conclusion) {
				deduced_satisfied_properties.add(implication.conclusion)
				return { deduced_satisfied_properties, found, reasons }
			}

			if (options.properties_dict) {
				reasons[implication.conclusion] = get_reason_string(
					implication,
					options.properties_dict,
				)
			}
		}

		for (const p of newly_found) deduced_satisfied_properties.add(p)

		if (!newly_found.size) break
	}

	return { deduced_satisfied_properties, found, reasons }
}

/**
 * Returns the set of unsatisfied properties that can be deduced from
 * a set of satisfied properties and a set of unsatisfied properties,
 * based on a list of normalized implications. If a property dictionary
 * is provided, human-readable reasons are generated as well.
 */
export function get_deduced_unsatisfied_properties(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedImplication[],
	options: {
		properties_dict?: Record<string, PropertyMeta>
		stop_when_found?: string
	},
) {
	const found = new Set<string>()
	const reasons: Record<string, string> = {}
	const deduced_unsatisfied_properties = new Set(unsatisfied_properties)

	while (true) {
		const newly_found = new Set<string>()

		for (const implication of implications) {
			if (!deduced_unsatisfied_properties.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!deduced_unsatisfied_properties.has(p) &&
					!newly_found.has(p) &&
					is_subset(implication.assumptions, satisfied_properties, {
						exception: p,
					})
				if (!is_valid) continue

				if (satisfied_properties.has(p)) {
					throw new Error(`Contradiction has been found for: ${p}`)
				}

				if (options?.stop_when_found === p) {
					deduced_unsatisfied_properties.add(p)
					return { deduced_unsatisfied_properties, found, reasons }
				}

				newly_found.add(p)
				found.add(p)

				if (options.properties_dict) {
					reasons[p] = get_contradiction_string(
						implication,
						options.properties_dict,
						p,
					)
				}
			}
		}

		for (const p of newly_found) deduced_unsatisfied_properties.add(p)

		if (!newly_found.size) break
	}

	return { deduced_unsatisfied_properties, found, reasons }
}
