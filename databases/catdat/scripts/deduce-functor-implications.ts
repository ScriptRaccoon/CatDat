import type { Client } from '@libsql/client'
import { are_equal_sets } from './shared'

// TODO: remove code duplication with category implication deduction script

/**
 * Deduces functor implications from given ones.
 */
export async function deduce_functor_implications(db: Client) {
	console.info('\n--- Deduce functor implications ---')
	await clear_deduced_functor_implications(db)
	await create_dualized_functor_implications(db)
}

/**
 * Clears all deduced functor implications. This is done as a first step.
 */
async function clear_deduced_functor_implications(db: Client) {
	await db.execute(`DELETE FROM functor_implications WHERE is_deduced = TRUE`)
}

/**
 * Dualizes all functor implications by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well. The assumptions of source and target
 * categories (if any) need to be dualized as well.
 */
async function create_dualized_functor_implications(db: Client) {
	const res = await db.execute(`
        SELECT
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
                JOIN properties p ON p.id = sa.value
            ) AS dual_source_assumptions,
            (
                SELECT json_group_array(p.dual_property_id)
                FROM json_each(v.target_assumptions) ta
                JOIN properties p ON p.id = ta.value
            ) AS dual_target_assumptions,
            (
                SELECT json_group_array(p.dual_property_id)
                FROM json_each(v.conclusions) c
                JOIN functor_properties p ON p.id = c.value
            ) AS dual_conclusions
        FROM functor_implications_view v
        WHERE v.is_deduced = FALSE
    `)

	const implications = res.rows as unknown as {
		id: string
		assumptions: string
		conclusions: string
		dual_assumptions: string
		dual_source_assumptions: string
		dual_target_assumptions: string
		dual_conclusions: string
		is_equivalence: number
		reason: string
	}[]

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

	await db.batch(
		dualizable_implications.map((impl) => ({
			sql: `
            INSERT INTO functor_implication_input (
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
			args: [
				`dual_${impl.id}`,
				impl.dual_assumptions,
				impl.dual_source_assumptions,
				impl.dual_target_assumptions,
				impl.dual_conclusions,
				impl.is_equivalence,
				'This follows from the dual implication.',
				impl.id,
			],
		})),
		'write',
	)

	console.info(`Deduced ${dualizable_implications.length} implications by duality`)
}
