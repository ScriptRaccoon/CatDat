import { get_client } from './utils/helpers'
import { clear_deduced_implications, is_dualizable } from './utils/implications'

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
			assumptions: string
			conclusions: string
			dual_assumptions: string
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

	const implications = implications_query.all()

	const dualizable_implications = implications.filter(is_dualizable)

	const insert_query = db.prepare(
		`INSERT INTO category_implications_view (
			id,
			assumptions,
			conclusions,
			is_equivalence,
			is_deduced,
			dualized_from,
			proof
        ) VALUES (?, ?, ?, ?, TRUE, ?, ?)`,
	)

	const insert_duals = db.transaction(() => {
		for (const impl of dualizable_implications) {
			insert_query.run(
				`dual_${impl.id}`,
				impl.dual_assumptions,
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
                proof,
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
