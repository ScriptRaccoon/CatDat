import type { PropertyMeta } from './properties'
import { type StructureType } from '#shared/config.ts'
import { get_property_label } from '#shared/property.utils.ts'
import { type NormalizedImplication } from '#shared/implications.ts'
import { remove_underscores } from '#shared/utils.ts'

/**
 * Joins a list of clauses, e.g. ["a", "b", "c"] to "a, b, and c".
 * Since clauses may contain "and" themselves, two clauses are
 * separated by a comma as well, e.g. "a, and b".
 */
function join_clauses(clauses: string[]): string {
	if (clauses.length <= 1) return clauses.join('')
	return `${clauses.slice(0, -1).join(', ')}, and ${clauses.at(-1)}`
}

/**
 * Returns a phrase such as "is complete and has a generator",
 * or "would be complete and would have a generator" if conditional.
 */
function get_property_phrase(
	properties: Iterable<string>,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false
): string {
	const relation_key = conditional ? 'conditional_relation' : 'relation'
	const phrases: string[] = []

	for (const property of properties) {
		const relation = properties_dict[property][relation_key]
		phrases.push(`${relation} ${get_property_label(property)}`)
	}

	return phrases.join(' and ')
}

/**
 * Returns the clauses describing the assumptions of an implication,
 * such as ["it is conservative", "the domain has equalizers"].
 * The given property is excluded from the own assumptions.
 */
function get_assumption_clauses(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	associated_dicts: Record<string, Record<string, PropertyMeta>>,
	options: { excluded_property?: string } = {}
): string[] {
	const clauses: string[] = []

	const own = Array.from(implication.assumptions).filter(
		(assumption) => assumption !== options.excluded_property
	)

	if (own.length) {
		clauses.push(`it ${get_property_phrase(own, properties_dict)}`)
	}

	const associated_assumptions = implication.associated_assumptions ?? {}

	for (const [label, props] of Object.entries(associated_assumptions)) {
		if (!props?.size) continue
		clauses.push(
			`the ${remove_underscores(label)} ${get_property_phrase(props, associated_dicts[label])}`
		)
	}

	return clauses
}

/**
 * Returns the reference to an implication, such as
 * "by <a href="...">this result</a>".
 */
function get_reference(implication: NormalizedImplication, type: StructureType) {
	return `by <a href="/${type}-implication/${implication.id}">this result</a>`
}

/**
 * Returns the proof that a structure satisfies the conclusion of an
 * implication since it satisfies its assumptions, such as
 * "Since it has finite products and equalizers, it is finitely complete (by this result)."
 */
export function get_proof_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	associated_dicts: Record<string, Record<string, PropertyMeta>>,
	type: StructureType
) {
	const clauses = get_assumption_clauses(implication, properties_dict, associated_dicts)

	const assumption_string = clauses.length
		? join_clauses(clauses)
		: `it is a ${remove_underscores(type)}`

	const conclusion_string = get_property_phrase(
		[implication.conclusion],
		properties_dict
	)

	const ref = get_reference(implication, type)

	return `Since ${assumption_string}, it ${conclusion_string} (${ref}).`
}

/**
 * Returns the proof that a structure does not satisfy the given property,
 * which is one of the assumptions of an implication whose conclusion
 * is known to be unsatisfied, such as "Assume for contradiction that it
 * is coaccessible. Since it is complete, it would be locally copresentable
 * (by this result) – contradiction."
 */
export function get_contradiction_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	associated_dicts: Record<string, Record<string, PropertyMeta>>,
	property: string,
	type: StructureType
) {
	const clauses = get_assumption_clauses(
		implication,
		properties_dict,
		associated_dicts,
		{ excluded_property: property }
	)

	const conclusion_string = get_property_phrase(
		[implication.conclusion],
		properties_dict,
		true
	)

	const ref = get_reference(implication, type)

	const property_string = get_property_phrase([property], properties_dict)

	const contra = `Assume for contradiction that it ${property_string}.`

	const consequence = `it ${conclusion_string} (${ref}) – contradiction.`

	return clauses.length
		? `${contra} Since ${join_clauses(clauses)}, ${consequence}`
		: `${contra} Then ${consequence}`
}
