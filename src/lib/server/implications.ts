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
		is_equivalence: 0 | 1
		assumptions: string
		conclusions: string
	}>(
		sql`
			SELECT
				i.id,
				i.is_equivalence,
				(
					SELECT json_group_array(a.property_id)
					FROM assumptions a WHERE a.implication_id = i.id
					ORDER BY lower(a.property_id)
				) AS assumptions,
				(
					SELECT json_group_array(c.property_id)
					FROM conclusions c WHERE c.implication_id = i.id
					ORDER BY lower(c.property_id)
				) AS conclusions
			FROM implications i
			WHERE i.type = 'category'
		`,
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
		is_equivalence: 0 | 1
		assumptions: string
		source_assumptions: string
		target_assumptions: string
		conclusions: string
	}>(
		sql`
			SELECT
				i.id,
				i.is_equivalence,
				(
					SELECT json_group_array(a.property_id)
					FROM assumptions a WHERE a.implication_id = i.id
					ORDER BY lower(a.property_id)
				) AS assumptions,
				(
					SELECT json_group_array(a.property_id)
					FROM source_assumptions a WHERE a.implication_id = i.id
					ORDER BY lower(a.property_id)
				) AS source_assumptions,
				(
					SELECT json_group_array(a.property_id)
					FROM target_assumptions a WHERE a.implication_id = i.id
					ORDER BY lower(a.property_id)
				) AS target_assumptions,
				(
					SELECT json_group_array(c.property_id)
					FROM conclusions c WHERE c.implication_id = i.id
					ORDER BY lower(c.property_id)
				) AS conclusions
			FROM implications i
			WHERE type = 'functor'
		`,
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
