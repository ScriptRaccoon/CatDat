import sql from 'sql-template-tag'
import { query } from './db.catdat'
import { parse_json_set } from './utils'
import type { StructureType } from '$lib/commons/types'

// TODO: If possible, remove the code duplication with deduction and redundancy scripts.

export type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

/**
 * List of normalized implications of a given type of structure.
 */
export function get_normalized_implications(type: StructureType) {
	if (type === 'category') return get_normalized_category_implications()
	if (type === 'functor') return get_normalized_functor_implications()
	throw new Error('Unsupported type')
}

/**
 * List of normalized implications of categories.
 */
function get_normalized_category_implications() {
	const { rows, err } = query<{
		id: string
		assumptions: string
		conclusions: string
		is_equivalence: 0 | 1
	}>(
		sql`SELECT id, assumptions, conclusions, is_equivalence FROM category_implications_view`,
	)

	if (err) return { implications: null, err }

	const implications: NormalizedImplication[] = []

	for (const impl of rows) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)

		for (const conclusion of conclusions) {
			implications.push({ id: impl.id, assumptions, conclusion })
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: conclusions,
					conclusion: assumption,
				})
			}
		}
	}

	return { implications, err: null }
}

/**
 * List of normalized implications of functors that have no source or target
 * assumptions, i.e. those that are universally true. Only those are relevant
 * for the consistency check.
 */
function get_normalized_functor_implications() {
	const { rows, err } = query<{
		id: string
		assumptions: string
		conclusions: string
		source_assumptions: string
		target_assumptions: string
		is_equivalence: 0 | 1
	}>(
		sql`
			SELECT id, assumptions, source_assumptions, target_assumptions,
			conclusions, is_equivalence
			FROM functor_implications_view`,
	)

	if (err) return { implications: null, err }

	const implications: NormalizedImplication[] = []

	for (const impl of rows) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const source_assumptions = parse_json_set<string>(impl.source_assumptions)
		const target_assumptions = parse_json_set<string>(impl.target_assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)

		if (source_assumptions.size > 0 || target_assumptions.size > 0) continue

		for (const conclusion of conclusions) {
			implications.push({ id: impl.id, assumptions, conclusion })
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: conclusions,
					conclusion: assumption,
				})
			}
		}
	}

	return { implications, err: null }
}

export function stringify_implication(implication: NormalizedImplication) {
	return `${[...implication.assumptions].join(' ∧ ')} ⟹ ${implication.conclusion}`
}
