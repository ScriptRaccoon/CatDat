import { type Database } from 'better-sqlite3'
import type { NormalizedImplication, PropertyMeta } from './deduction'
import { are_equal_sets, parse_json_set } from './helpers'

function get_assumption_string(
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

function get_conclusion_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { conclusion } = implication

	return `${properties_dict[conclusion][conditional ? 'conditional' : 'relation']} ${conclusion}`
}

export function get_reason_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	type: 'category' | 'functor',
) {
	const assumption_string = get_assumption_string(implication, properties_dict)
	const conclusion_string = get_conclusion_string(implication, properties_dict)

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`
	return `Since it ${assumption_string}, it ${conclusion_string} (${ref}).`
}

export function get_contradiction_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	property: string,
	type: 'category' | 'functor',
) {
	const assumption_string = get_assumption_string(implication, properties_dict, true)
	const conclusion_string = get_conclusion_string(implication, properties_dict, true)

	const has_multiple_assumptions = implication.assumptions.size > 1

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`

	const contra = `Assume for contradiction that it ${properties_dict[property].relation} ${property}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}

/**
 * Clears all deduced implications. This is done before the deduction starts.
 */
export function clear_deduced_implications(db: Database, type: 'category' | 'functor') {
	db.prepare(`DELETE FROM ${type}_implications WHERE is_deduced = TRUE`).run()
}

type EntityImplicationWithDualProperties = {
	assumptions: string
	conclusions: string
	dual_assumptions: string
	dual_conclusions: string
	dual_source_assumptions?: string
	dual_target_assumptions?: string
}

/**
 * Checks if an implication can be dualized (i.e. if all the involved properties
 * have a dual) and if the dual is different from it.
 */
export function is_dualizable(impl: EntityImplicationWithDualProperties): boolean {
	const assumptions = parse_json_set<string>(impl.assumptions)
	const conclusions = parse_json_set<string>(impl.conclusions)
	const dual_assumptions = parse_json_set<string | null>(impl.dual_assumptions)
	const dual_conclusions = parse_json_set<string | null>(impl.dual_conclusions)

	if (dual_assumptions.has(null) || dual_conclusions.has(null)) return false

	if (impl.dual_source_assumptions) {
		const dual_source_assumptions = parse_json_set<string | null>(
			impl.dual_source_assumptions,
		)
		if (dual_source_assumptions.has(null)) return false
	}

	if (impl.dual_target_assumptions) {
		const dual_target_assumptions = parse_json_set<string | null>(
			impl.dual_target_assumptions,
		)
		if (dual_target_assumptions.has(null)) return false
	}

	return !(
		are_equal_sets(assumptions, dual_assumptions) &&
		are_equal_sets(conclusions, dual_conclusions)
	)
}
