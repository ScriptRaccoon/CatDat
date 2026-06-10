import { are_equal_sets, get_client, parse_json_set } from './utils/helpers'
import { clear_deduced_implications } from './utils/implications'

const db = get_client()

/**
 * Deduces category implications from given ones.
 */
export function deduce_category_implications() {
	console.info('\n--- Deduce category implications ---')
	clear_deduced_implications(db, 'category')
	create_dualized_category_implications()
	create_self_dual_category_implications()
}

/**
 * Dualizes all implications of categories by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well.
 */
function create_dualized_category_implications() {
	const implications_query = db.prepare<
		never[],
		{
			id: string
			is_equivalence: 0 | 1
			assumptions: string
			conclusions: string
			dual_assumptions: string
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
				FROM conclusions a
				LEFT JOIN properties p ON p.id = a.property_id
				WHERE a.implication_id = i.id
			) AS dual_conclusions
		FROM implications_view i
		WHERE i.type = 'category' AND i.is_deduced = FALSE`,
	)

	const implications = implications_query.all()

	const implication_insert = db.prepare(`
		INSERT INTO implications
			(id, type, is_equivalence, proof, is_deduced, dualized_from)
		VALUES (?, 'category', ?, ?, TRUE, ?)	
	`)

	const assumption_insert = db.prepare(`
		INSERT INTO assumptions (implication_id, property_id, type)
		VALUES (?, ?, 'category')
	`)

	const conclusion_insert = db.prepare(`
		INSERT INTO conclusions (implication_id, property_id, type)
		VALUES (?, ?, 'category')
	`)

	const insert_duals = db.transaction(() => {
		let count = 0

		for (const impl of implications) {
			const dual_id = `dual_${impl.id}`

			const assumptions = parse_json_set(impl.assumptions)
			const dual_assumptions = parse_json_set(impl.dual_assumptions)
			const conclusions = parse_json_set(impl.conclusions)
			const dual_conclusions = parse_json_set(impl.dual_conclusions)

			if (dual_assumptions.has(null)) continue
			if (dual_conclusions.has(null)) continue

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

			for (const c of dual_conclusions) {
				conclusion_insert.run(dual_id, c)
			}
		}

		console.info(`Deduced ${count} implications by duality`)
	})

	insert_duals()
}

/**
 * Creates all trivial implications of the form
 * self-dual + P ===> P^op
 */
function create_self_dual_category_implications() {
	const relevant_properties = db
		.prepare<never[], { id: string; dual: string }>(
			`SELECT id, dual_property_id AS dual
			FROM properties
			WHERE
				type = 'category'
				AND dual_property_id IS NOT NULL
				AND id != dual_property_id
				AND invariant_under_equivalences = TRUE`,
		)
		.all()

	const implication_insert = db.prepare(`
		INSERT INTO implications (id, type, proof, is_deduced)
		VALUES (?, 'category', 'This holds by self-duality.', TRUE)	
	`)

	const assumption_insert = db.prepare(`
		INSERT INTO assumptions (implication_id, property_id, type)
		VALUES (?, ?, 'category')
	`)

	const conclusion_insert = db.prepare(`
		INSERT INTO conclusions (implication_id, property_id, type)
		VALUES (?, ?, 'category')
	`)

	for (const p of relevant_properties) {
		const implication_id = `self-dual_${p.id}`
		implication_insert.run(implication_id)
		assumption_insert.run(implication_id, p.id)
		assumption_insert.run(implication_id, 'self-dual')
		conclusion_insert.run(implication_id, p.dual)
	}

	console.info(`Deduced ${relevant_properties.length} implications by self-duality`)
}
