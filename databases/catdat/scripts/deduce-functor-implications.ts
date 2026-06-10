import { are_equal_sets, get_client, parse_json_set } from './utils/helpers'
import { clear_deduced_implications } from './utils/implications'

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
 * then P^op ===> Q^op holds as well.
 */
function create_dualized_functor_implications() {
	const implications_query = db.prepare<
		never[],
		{
			id: string
			is_equivalence: 0 | 1
			assumptions: string
			conclusions: string
			dual_assumptions: string
			dual_source_assumptions: string
			dual_target_assumptions: string
			dual_conclusions: string
		}
	>(
		`SELECT
			i.id,
			i.is_equivalence,
			i.assumptions,
			i.conclusions,
			(
				SELECT json_group_array(p.dual_property_id)
				FROM assumptions a
				LEFT JOIN properties p ON p.id = a.property_id
				WHERE a.implication_id = i.id
			) AS dual_assumptions,
			(
				SELECT json_group_array(p.dual_property_id)
				FROM source_assumptions a
				LEFT JOIN properties p ON p.id = a.property_id
				WHERE a.implication_id = i.id
			) AS dual_source_assumptions,
			(
				SELECT json_group_array(p.dual_property_id)
				FROM target_assumptions a
				LEFT JOIN properties p ON p.id = a.property_id
				WHERE a.implication_id = i.id
			) AS dual_target_assumptions,
			(
				SELECT json_group_array(p.dual_property_id)
				FROM conclusions a
				LEFT JOIN properties p ON p.id = a.property_id
				WHERE a.implication_id = i.id
			) AS dual_conclusions
		FROM implications_view i
		WHERE i.type = 'functor' AND i.is_deduced = FALSE`,
	)

	const implications = implications_query.all()

	const implication_insert = db.prepare(`
		INSERT INTO implications
			(id, type, is_equivalence, proof, is_deduced, dualized_from)
		VALUES (?, 'functor', ?, ?, TRUE, ?)	
	`)

	const assumption_insert = db.prepare(`
		INSERT INTO assumptions (implication_id, property_id, type)
		VALUES (?, ?, 'functor')
	`)

	const source_assumption_insert = db.prepare(`
		INSERT INTO source_assumptions
			(implication_id, property_id, type, property_type)
		VALUES (?, ?, 'functor', 'category')
	`)

	const target_assumption_insert = db.prepare(`
		INSERT INTO target_assumptions
			(implication_id, property_id, type, property_type)
		VALUES (?, ?, 'functor', 'category')
	`)

	const conclusion_insert = db.prepare(`
		INSERT INTO conclusions (implication_id, property_id, type)
		VALUES (?, ?, 'functor')
	`)

	const insert_duals = db.transaction(() => {
		let count = 0

		for (const impl of implications) {
			const dual_id = `dual_${impl.id}`

			const assumptions = parse_json_set(impl.assumptions)
			const dual_assumptions = parse_json_set(impl.dual_assumptions)
			const conclusions = parse_json_set(impl.conclusions)
			const dual_conclusions = parse_json_set(impl.dual_conclusions)
			const dual_source_assumptions = parse_json_set(impl.dual_source_assumptions)
			const dual_target_assumptions = parse_json_set(impl.dual_target_assumptions)

			if (dual_assumptions.has(null)) continue
			if (dual_conclusions.has(null)) continue
			if (dual_source_assumptions.has(null)) continue
			if (dual_target_assumptions.has(null)) continue

			if (
				are_equal_sets(assumptions, dual_assumptions) &&
				are_equal_sets(conclusions, dual_conclusions)
			) {
				continue
			}

			count++

			implication_insert.run(
				dual_id,
				impl.is_equivalence,
				'This follows from the dual implication.',
				impl.id,
			)

			for (const a of dual_assumptions) {
				assumption_insert.run(dual_id, a)
			}

			for (const a of dual_source_assumptions) {
				source_assumption_insert.run(dual_id, a)
			}

			for (const a of dual_target_assumptions) {
				target_assumption_insert.run(dual_id, a)
			}

			for (const c of dual_conclusions) {
				conclusion_insert.run(dual_id, c)
			}
		}

		console.info(`Deduced ${count} implications by duality`)
	})

	insert_duals()
}
