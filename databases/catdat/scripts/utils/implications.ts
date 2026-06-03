import { type Database } from 'better-sqlite3'
import type { PropertyMeta } from './deduction'
import { StructureType } from '../config'
import { parse_json_set } from './helpers'

export type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	source_assumptions?: Set<string>
	target_assumptions?: Set<string>
	conclusion: string
}

function get_assumption_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { assumptions } = implication

	// TODO: also incorporate source_assumptions and target_assumptions if present

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

	const contra = `Assume for contradiction that it ${properties_dict[property].relation} ${property}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}

/**
 * Implications have the form
 * P_1 + ... + P_n ===> Q_1 + ... + Q_m
 * or
 * P_1 + ... + P_n <===> Q_1 + ... + Q_m.
 * This function decomposes them into normalized implications,
 * which have the form
 * P_1 + ... + P_n ===> Q_i.
 */
export function get_normalized_functor_implications(
	db: Database,
	type: StructureType,
): NormalizedImplication[] {
	const all_implications_db = db
		.prepare<
			[string],
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
				i.id,
				i.is_equivalence,
				(
					SELECT json_group_array(property_id)
					FROM implication_properties ip
					WHERE ip.implication_id  = i.id
					AND ip.structure = 'self'
					AND ip.kind = 'assumption'
				) as assumptions,
				(
					SELECT json_group_array(property_id)
					FROM implication_properties ip
					WHERE ip.implication_id  = i.id
					AND ip.structure = 'source'
					AND ip.kind = 'assumption'
				) as source_assumptions,
				(
					SELECT json_group_array(property_id)
					FROM implication_properties ip
					WHERE ip.implication_id  = i.id
					AND ip.structure = 'target'
					AND ip.kind = 'assumption'
				) as target_assumptions,
				(
					SELECT json_group_array(property_id)
					FROM implication_properties ip
					WHERE ip.implication_id  = i.id
					AND ip.structure = 'self'
					AND ip.kind = 'conclusion'
				) as conclusions
			FROM implications i
			WHERE i.type = ?
			GROUP BY i.id`,
		)
		.all(type)

	const implications: NormalizedImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)
		const source_assumptions = parse_json_set<string>(impl.source_assumptions)
		const target_assumptions = parse_json_set<string>(impl.target_assumptions)

		for (const conclusion of conclusions) {
			implications.push({
				id: impl.id,
				assumptions,
				conclusion,
				...(source_assumptions.size > 0 && { source_assumptions }),
				...(target_assumptions.size > 0 && { target_assumptions }),
			})
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: conclusions,
					conclusion: assumption,
					...(source_assumptions.size > 0 && { source_assumptions }),
					...(target_assumptions.size > 0 && { target_assumptions }),
				})
			}
		}
	}

	return implications
}
