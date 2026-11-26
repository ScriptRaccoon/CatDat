import { db } from './db'
import { type StructureType } from '#shared/config.ts'
import { devlog, remove_underscores } from '#shared/utils.ts'
import {
	get_normalized_implications,
	get_undecidable_implications
} from '#shared/implications.ts'
import { deduce_properties } from '#shared/deduction.utils.ts'

/**
 * Tests that no undecidable implication P ===> Q of a given type
 * is provable (Q can be deduced from P) or refuted (some structure
 * satisfies P but not Q).
 */
export function test_undecidable_implications(type: StructureType) {
	const undecidable_implications = get_undecidable_implications(db, type)

	if (undecidable_implications.length === 0) return

	const implications = get_normalized_implications(db, type)

	const counterexample_query = db
		.prepare<[string, string, StructureType], string>(
			`SELECT a.structure_id
			FROM property_assignments a
			INNER JOIN property_assignments b
			ON b.structure_id = a.structure_id
			WHERE a.property_id = ? AND a.is_satisfied = TRUE
			AND b.property_id = ? AND b.is_satisfied = FALSE
			AND a.type = ?`
		)
		.pluck()

	for (const { id, assumptions, conclusion } of undecidable_implications) {
		const { deduced_satisfied_properties } = deduce_properties(
			assumptions,
			implications,
			() => ({ proof: null, stop: false })
		)

		if (deduced_satisfied_properties.has(conclusion)) {
			throw new Error(
				`❌ The undecidable implication ${id} can be deduced from the implications`
			)
		}

		// undecidable implications have exactly one assumption
		const [assumption] = assumptions
		const counterexamples = counterexample_query.all(assumption, conclusion, type)

		if (counterexamples.length > 0) {
			throw new Error(
				`❌ The undecidable implication ${id} is refuted by: ${counterexamples.join(', ')}`
			)
		}
	}

	devlog(`✅ Undecidable ${remove_underscores(type)} implications are not decided`)
}
