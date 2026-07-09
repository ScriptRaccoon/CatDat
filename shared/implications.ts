import { type Database } from 'better-sqlite3'
import { type StructureType } from './config'
import { parse_json_set, parse_nested_json_set } from './utils'

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
	type: StructureType
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
			FROM implications_view
			WHERE type = ?`
		)
		.all(type)

	const implications: NormalizedImplication[] = []

	for (const impl of implications_db) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)
		const mapped_assumptions = parse_nested_json_set<string>(impl.mapped_assumptions)

		const has_mapped_assumptions = Object.keys(mapped_assumptions).length > 0

		for (const conclusion of conclusions) {
			const implication: NormalizedImplication = {
				id: impl.id,
				assumptions,
				conclusion
			}

			if (has_mapped_assumptions) {
				implication.mapped_assumptions = mapped_assumptions
			}

			implications.push(implication)
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				const implication: NormalizedImplication = {
					id: impl.id,
					assumptions: conclusions,
					conclusion: assumption
				}

				if (has_mapped_assumptions) {
					implication.mapped_assumptions = mapped_assumptions
				}

				implications.push(implication)
			}
		}
	}

	return implications
}

export function stringify_implication(implication: NormalizedImplication) {
	return `${[...implication.assumptions].join(' ∧ ')} ⟹ ${implication.conclusion}`
}
