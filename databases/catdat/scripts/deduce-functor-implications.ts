import { get_client } from './utils/helpers'
import { clear_deduced_implications, is_dualizable } from './utils/implications'

const db = get_client()

/**
 * Deduces functor implications from given ones.
 */
export function deduce_functor_implications() {
	console.info('\n--- Deduce functor implications ---')
	clear_deduced_implications(db, 'functor')
	create_dualized_functor_implications()
}

/**
 * Dualizes all implications of functors by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well. The assumptions of source and target
 * categories (if any) need to be dualized as well.
 */
function create_dualized_functor_implications() {
	const implications_query = db.prepare<
		never[],
		{
			id: string
			assumptions: string
			conclusions: string
			dual_assumptions: string
			dual_source_assumptions: string
			dual_target_assumptions: string
			dual_conclusions: string
			is_equivalence: 0 | 1
		}
	>(
		`SELECT
			v.id,
			v.assumptions,
			v.conclusions,
			v.is_equivalence,
			(
				SELECT json_group_array(p.dual_property_id)
				FROM json_each(v.assumptions) a
				JOIN properties p ON p.id = a.value
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
				JOIN properties p ON p.id = c.value
			) AS dual_conclusions
		FROM functor_implications_view v
		WHERE v.is_deduced = FALSE`,
	)

	const implications = implications_query.all()

	const dualizable_implications = implications.filter(is_dualizable)

	const insert_query = db.prepare(
		`INSERT INTO functor_implications_view (
			id,
			assumptions,
			source_assumptions,
			target_assumptions,
			conclusions,
			is_equivalence,
			is_deduced,
			dualized_from,
			proof
		) VALUES (?, ?, ?, ?, ?, ?, TRUE, ?, ?)`,
	)

	const insert_duals = db.transaction(() => {
		for (const impl of dualizable_implications) {
			insert_query.run(
				`dual_${impl.id}`,
				impl.dual_assumptions,
				impl.dual_source_assumptions,
				impl.dual_target_assumptions,
				impl.dual_conclusions,
				impl.is_equivalence,
				impl.id,
				'This follows from the dual implication.',
			)
		}
	})

	insert_duals()

	console.info(`Deduced ${dualizable_implications.length} implications by duality`)
}
