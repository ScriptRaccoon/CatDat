import { type Database } from 'better-sqlite3'
import type { PropertyMeta } from './properties'
import { StructureType } from '../config'
import { parse_nested_json_set, parse_json_set } from './helpers'
import { get_property_label } from '../../../../src/lib/commons/property.utils'

export type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	mapped_assumptions?: Partial<Record<string, Set<string>>>
}

/**
 * Implications have the form
 * P_1 + ... + P_n ===> Q_1 + ... + Q_m
 * or
 * P_1 + ... + P_n <===> Q_1 + ... + Q_m.
 * This function decomposes them into normalized implications,
 * which have the form
 * P_1 + ... + P_n ===> Q.
 */
export function get_normalized_implications(
	db: Database,
	type: StructureType,
): NormalizedImplication[] {
	const implications_db = db
		.prepare<
			[StructureType],
			{
				id: string
				is_equivalence: 0 | 1
				assumptions: string
				conclusions: string
				mapped_assumptions: string
			}
		>(
			`SELECT
				id,
				is_equivalence,
				assumptions,
				conclusions,
				mapped_assumptions
			FROM implications_view i
			WHERE i.type = ?`,
		)
		.all(type)

	const implications: NormalizedImplication[] = []

	for (const impl of implications_db) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)
		const mapped_assumptions = parse_nested_json_set<string>(impl.mapped_assumptions)

		for (const conclusion of conclusions) {
			const implication: NormalizedImplication = {
				id: impl.id,
				assumptions,
				conclusion,
			}

			if (Object.keys(mapped_assumptions).length > 0) {
				implication.mapped_assumptions = mapped_assumptions
			}

			implications.push(implication)
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				const implication: NormalizedImplication = {
					id: impl.id,
					assumptions: conclusions,
					conclusion: assumption,
				}

				if (Object.keys(mapped_assumptions).length > 0) {
					implication.mapped_assumptions = mapped_assumptions
				}

				implications.push(implication)
			}
		}
	}

	return implications
}

function get_assumption_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { assumptions } = implication

	const own = Array.from(assumptions)
		.map(
			(assumption) =>
				`${properties_dict[assumption][conditional ? 'conditional_relation' : 'relation']} ${get_property_label(assumption)}`,
		)
		.join(' and ')

	if (!implication.mapped_assumptions) return own

	const mapped = Object.entries(implication.mapped_assumptions)
		.map(
			([map, props]) =>
				`and the ${map} has the required properties (${Array.from(props!).join(', ')})`,
		)
		.join(', ')

	return `${own}, ${mapped}`
}

function get_conclusion_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { conclusion } = implication

	return `${properties_dict[conclusion][conditional ? 'conditional_relation' : 'relation']} ${get_property_label(conclusion)}`
}

export function get_proof_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	type: StructureType,
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
	type: StructureType,
) {
	const assumption_string = get_assumption_string(implication, properties_dict, true)
	const conclusion_string = get_conclusion_string(implication, properties_dict, true)

	const has_multiple_assumptions =
		implication.assumptions.size > 1 || !!implication.mapped_assumptions

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`

	const relation = properties_dict[property].relation

	const contra = `Assume for contradiction that it ${relation} ${get_property_label(property)}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}
