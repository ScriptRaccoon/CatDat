import { type Database } from 'better-sqlite3'
import type { PropertyMeta } from './properties'
import { StructureType } from '../config'
import { parse_json_set } from './helpers'

export type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	// used for source and target assumptions of a functor implication
	associated_assumptions?: Record<string, Set<string>>
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
				source_assumptions: string
				target_assumptions: string
				conclusions: string
			}
		>(
			`SELECT
				id,
				is_equivalence,
				assumptions,
				source_assumptions,
				target_assumptions,
				conclusions
			FROM implications_view i
			WHERE i.type = ?`,
		)
		.all(type)

	const implications: NormalizedImplication[] = []

	for (const impl of implications_db) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)
		const source_assumptions = parse_json_set<string>(impl.source_assumptions)
		const target_assumptions = parse_json_set<string>(impl.target_assumptions)

		for (const conclusion of conclusions) {
			const implication: NormalizedImplication = {
				id: impl.id,
				assumptions,
				conclusion,
			}

			if (source_assumptions.size > 0 || target_assumptions.size > 0) {
				implication.associated_assumptions = {
					source: source_assumptions,
					target: target_assumptions,
				}
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

				if (source_assumptions.size > 0 || target_assumptions.size > 0) {
					implication.associated_assumptions = {
						source: source_assumptions,
						target: target_assumptions,
					}
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

	return Array.from(assumptions)
		.map(
			(assumption) =>
				`${properties_dict[assumption][conditional ? 'conditional_relation' : 'relation']} ${assumption}`,
		)
		.join(' and ')
}

function get_conclusion_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { conclusion } = implication

	return `${properties_dict[conclusion][conditional ? 'conditional_relation' : 'relation']} ${conclusion}`
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

	const has_multiple_assumptions = implication.assumptions.size > 1

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`

	const relation = properties_dict[property].relation

	const contra = `Assume for contradiction that it ${relation} ${property}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}
