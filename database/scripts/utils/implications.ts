import type { PropertyMeta } from './properties'
import type { StructureMeta, StructureRef } from './structures'
import { type StructureType } from '#shared/config.ts'
import { get_proof_link, get_property_label } from '#shared/property.utils.ts'
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
 * If a structure is given, each property is followed by a link
 * to its proof for that structure, such as "is complete (proof)".
 */
function get_property_phrase(
	properties: Iterable<string>,
	properties_dict: Record<string, PropertyMeta>,
	options: {
		relation_key?: 'relation' | 'negation' | 'conditional_relation'
		structure?: StructureRef
	} = {}
): string {
	const relation_key = options.relation_key ?? 'relation'
	const phrases: string[] = []

	for (const property of properties) {
		const relation = properties_dict[property][relation_key]
		const phrase = `${relation} ${get_property_label(property)}`
		phrases.push(
			options.structure
				? `${phrase} (${get_proof_link(options.structure.type, options.structure.id, property)})`
				: phrase
		)
	}

	return phrases.join(' and ')
}

/**
 * Returns the clauses describing the assumptions of an implication,
 * such as ["it is conservative (proof)", "the domain has equalizers (proof)"],
 * with links to the proofs of the assumptions for the given structure
 * and its associated structures.
 * The given property is excluded from the own assumptions.
 */
function get_assumption_clauses(
	implication: NormalizedImplication,
	structure: StructureMeta,
	type: StructureType,
	properties_dict: Record<string, PropertyMeta>,
	associated_dicts: Record<string, Record<string, PropertyMeta>>,
	options: { excluded_property?: string } = {}
): string[] {
	const clauses: string[] = []

	const own = Array.from(implication.assumptions).filter(
		(assumption) => assumption !== options.excluded_property
	)

	if (own.length) {
		const phrase = get_property_phrase(own, properties_dict, {
			structure: { id: structure.id, type }
		})
		clauses.push(`it ${phrase}`)
	}

	const associated_assumptions = implication.associated_assumptions ?? {}

	for (const [label, props] of Object.entries(associated_assumptions)) {
		if (!props?.size) continue
		const phrase = get_property_phrase(props, associated_dicts[label], {
			structure: structure.associated_structures?.[label]
		})
		clauses.push(`the ${remove_underscores(label)} ${phrase}`)
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
 * "Since it has finite products (proof) and equalizers (proof),
 * it is finitely complete (by this result)."
 */
export function get_proof_string(
	implication: NormalizedImplication,
	structure: StructureMeta,
	properties_dict: Record<string, PropertyMeta>,
	associated_dicts: Record<string, Record<string, PropertyMeta>>,
	type: StructureType
) {
	const clauses = get_assumption_clauses(
		implication,
		structure,
		type,
		properties_dict,
		associated_dicts
	)

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
 * is coaccessible. Since it is complete (proof), it would be locally
 * copresentable (by this result), but it is not locally copresentable (proof)."
 */
export function get_contradiction_string(
	implication: NormalizedImplication,
	structure: StructureMeta,
	properties_dict: Record<string, PropertyMeta>,
	associated_dicts: Record<string, Record<string, PropertyMeta>>,
	property: string,
	type: StructureType
) {
	const clauses = get_assumption_clauses(
		implication,
		structure,
		type,
		properties_dict,
		associated_dicts,
		{ excluded_property: property }
	)

	const conclusion_string = get_property_phrase(
		[implication.conclusion],
		properties_dict,
		{ relation_key: 'conditional_relation' }
	)

	const negated_conclusion_string = get_property_phrase(
		[implication.conclusion],
		properties_dict,
		{ relation_key: 'negation', structure: { id: structure.id, type } }
	)

	const ref = get_reference(implication, type)

	const property_string = get_property_phrase([property], properties_dict)

	const contra = `Assume for contradiction that it ${property_string}.`

	const consequence = `it ${conclusion_string} (${ref}), but it ${negated_conclusion_string}.`

	return clauses.length
		? `${contra} Since ${join_clauses(clauses)}, ${consequence}`
		: `${contra} Then ${consequence}`
}
