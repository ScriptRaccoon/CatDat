import { type Database } from 'better-sqlite3'
import { type StructureType } from './config'
import { parse_json_set, parse_nested_json_set } from './utils'

export type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	associated_assumptions?: Partial<Record<string, Set<string>>>
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
				associated_assumptions: string
			}
		>(
			`SELECT
				id,
				is_equivalence,
				assumptions,
				conclusions,
				associated_assumptions
			FROM implications_view
			WHERE type = ?`
		)
		.all(type)

	const implications: NormalizedImplication[] = []

	for (const impl of implications_db) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)
		const associated_assumptions = parse_nested_json_set<string>(
			impl.associated_assumptions
		)

		const has_associated_assumptions = Object.keys(associated_assumptions).length > 0

		for (const conclusion of conclusions) {
			const implication: NormalizedImplication = {
				id: impl.id,
				assumptions,
				conclusion
			}

			if (has_associated_assumptions) {
				implication.associated_assumptions = associated_assumptions
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

				if (has_associated_assumptions) {
					implication.associated_assumptions = associated_assumptions
				}

				implications.push(implication)
			}
		}
	}

	return implications
}

/**
 * Returns a dictionary mapping each label of a structure association
 * of the given type (e.g. "domain" for functors) to the normalized
 * implications of the associated structure type.
 */
export function get_associated_implications(db: Database, type: StructureType) {
	const associations = db
		.prepare<[StructureType], { label: string; target_type: StructureType }>(
			`SELECT label, target_type
			FROM structure_associations WHERE source_type = ?`
		)
		.all(type)

	const cache = new Map<StructureType, NormalizedImplication[]>()
	const result: Record<string, NormalizedImplication[]> = {}

	for (const { label, target_type } of associations) {
		if (!cache.has(target_type)) {
			cache.set(target_type, get_normalized_implications(db, target_type))
		}
		result[label] = cache.get(target_type)!
	}

	return result
}

export function stringify_implication(implication: NormalizedImplication) {
	return `${[...implication.assumptions].join(' ∧ ')} ⟹ ${implication.conclusion}`
}

export function has_associated_assumptions(implication: NormalizedImplication) {
	return implication.associated_assumptions !== undefined
}

/**
 * Stringifies the implication and marks it with an asterisk
 * if it has assumptions about associated structures.
 */
export function stringify_with_asterisk(implication: NormalizedImplication) {
	const asterisk = has_associated_assumptions(implication) ? ' *' : ''
	return stringify_implication(implication) + asterisk
}
