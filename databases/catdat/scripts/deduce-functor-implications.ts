import { type Database } from 'better-sqlite3'

import { are_equal_sets } from './shared'

// TODO: remove code duplication with category implication deduction script

/**
 * Deduces functor implications from given ones.
 */
export function deduce_functor_implications(db: Database) {
	console.info('\n--- Deduce functor implications ---')
	clear_deduced_functor_implications(db)
	create_dualized_functor_implications(db)
}

/**
 * Clears all deduced functor implications. This is done as a first step.
 */
function clear_deduced_functor_implications(db: Database) {
	db.prepare(`DELETE FROM functor_implications WHERE is_deduced = TRUE`).run()
}

/**
 * Dualizes all functor implications by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well. The assumptions of source and target
 * categories (if any) need to be dualized as well.
 */
function create_dualized_functor_implications(db: Database) {
	type FullImplication = {
		id: string
		assumptions: string
		conclusions: string
		dual_assumptions: string
		dual_source_assumptions: string
		dual_target_assumptions: string
		dual_conclusions: string
		is_equivalence: number
		reason: string
	}

	const implications = db
		.prepare(
			`SELECT
				v.id,
				v.assumptions,
				v.conclusions,
				v.is_equivalence,
				v.reason,
				(
					SELECT json_group_array(p.dual_property_id)
					FROM json_each(v.assumptions) a
					JOIN functor_properties p ON p.id = a.value
				) AS dual_assumptions,
				(
					SELECT json_group_array(p.dual_property_id)
					FROM json_each(v.source_assumptions) sa
					JOIN category_properties p ON p.id = sa.value
				) AS dual_source_assumptions,
				(
					SELECT json_group_array(p.dual_property_id)
					FROM json_each(v.target_assumptions) ta
					JOIN category_properties p ON p.id = ta.value
				) AS dual_target_assumptions,
				(
					SELECT json_group_array(p.dual_property_id)
					FROM json_each(v.conclusions) c
					JOIN functor_properties p ON p.id = c.value
				) AS dual_conclusions
			FROM functor_implications_view v
			WHERE v.is_deduced = FALSE`,
		)
		.all() as FullImplication[]

	const dualizable_implications = implications.filter((impl) => {
		const has_null =
			JSON.parse(impl.dual_assumptions).includes(null) ||
			JSON.parse(impl.dual_conclusions).includes(null) ||
			JSON.parse(impl.dual_source_assumptions).includes(null) ||
			JSON.parse(impl.dual_target_assumptions).includes(null)

		if (has_null) return false

		const assumptions = new Set(JSON.parse(impl.assumptions))
		const conclusions = new Set(JSON.parse(impl.conclusions))
		const dual_assumptions = new Set(JSON.parse(impl.dual_assumptions))
		const dual_conclusions = new Set(JSON.parse(impl.dual_conclusions))

		return (
			!are_equal_sets(assumptions, dual_assumptions) ||
			!are_equal_sets(conclusions, dual_conclusions)
		)
	})

	const insert_duals = db.transaction(() => {
		for (const impl of dualizable_implications) {
			db.prepare(
				`INSERT INTO functor_implications_view (
					id,
					assumptions,
					source_assumptions,
					target_assumptions,
					conclusions,
					is_equivalence,
					reason,
					dualized_from,
					is_deduced
				) VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE)`,
			).run(
				`dual_${impl.id}`,
				impl.dual_assumptions,
				impl.dual_source_assumptions,
				impl.dual_target_assumptions,
				impl.dual_conclusions,
				impl.is_equivalence,
				'This follows from the dual implication.',
				impl.id,
			)
		}
	})

	insert_duals()
	console.info(`Deduced ${dualizable_implications.length} implications by duality`)
}
