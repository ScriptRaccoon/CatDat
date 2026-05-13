import { are_equal_sets, get_client } from './utils/helpers'

const db = get_client()

/**
 * Deduces implications from given ones.
 */
export function deduce_category_implications() {
	console.info('\n--- Deduce category implications ---')
	clear_deduced_category_implications()
	create_dualized_category_implications()
	create_self_dual_category_implications()
}

/**
 * Clears all deduced implications. This is done as a first step.
 */
function clear_deduced_category_implications() {
	db.prepare(`DELETE FROM category_implications WHERE is_deduced = TRUE`).run()
}

/**
 * Dualizes all implications by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well.
 */
function create_dualized_category_implications() {
	type FullImplication = {
		id: string
		assumptions: string
		conclusions: string
		dual_assumptions: string
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
                    JOIN category_properties p ON p.id = a.value
                ) AS dual_assumptions,
                (
                    SELECT json_group_array(p.dual_property_id)
                    FROM json_each(v.conclusions) c
                    JOIN category_properties p ON p.id = c.value
                ) AS dual_conclusions
            FROM category_implications_view v
            WHERE v.is_deduced = FALSE`,
		)
		.all() as FullImplication[]

	const dualizable_implications = implications.filter((impl) => {
		const has_null =
			JSON.parse(impl.dual_assumptions).includes(null) ||
			JSON.parse(impl.dual_conclusions).includes(null)
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
				`INSERT INTO category_implications_view (
                id,
                assumptions,
                conclusions,
                is_equivalence,
                reason,
                is_deduced,
                dualized_from
            ) VALUES (?, ?, ?, ?, ?, TRUE, ?)`,
			).run(
				`dual_${impl.id}`,
				impl.dual_assumptions,
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

/**
 * Creates all trivial implications of the form
 * self-dual + P ===> P^op
 */
function create_self_dual_category_implications() {
	const rows = db
		.prepare(
			`INSERT INTO category_implications_view (
                id,
                assumptions,
                conclusions,
                is_equivalence,
                reason,
                is_deduced
            )
            SELECT
                'self-dual_' || p.id,
                json_array('self-dual', p.id),
                json_array(p.dual_property_id),
                FALSE,
                'This holds by self-duality.',
                TRUE
            FROM
                category_properties p
            WHERE
                p.dual_property_id IS NOT NULL
                AND p.id != 'self-dual'
                AND p.id != p.dual_property_id
                AND p.invariant_under_equivalences = TRUE
            RETURNING id`,
		)
		.all()

	console.info(`Deduced ${rows.length} implications by self-duality`)
}
