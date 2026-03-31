import { type Client } from '@libsql/client'
import { are_equal_sets } from './shared'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export async function deduce_category_implications(db: Client) {
	await clear_deduced_category_implications(db)
	await create_dualized_category_implications(db)
	await create_self_dual_category_implications(db)
}

async function clear_deduced_category_implications(db: Client) {
	await db.execute(`DELETE FROM implications WHERE is_deduced = TRUE`)
}

async function create_dualized_category_implications(db: Client) {
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
                JOIN properties p ON p.id = a.value
            ) AS dual_assumptions,
            (
                SELECT json_group_array(p.dual_property_id)
                FROM json_each(v.conclusions) c
                JOIN properties p ON p.id = c.value
            ) AS dual_conclusions
        FROM implications_view v
        WHERE v.is_deduced = FALSE
    `)

	const implications = res.rows as unknown as {
		id: string
		assumptions: string
		conclusions: string
		dual_assumptions: string
		dual_conclusions: string
		is_equivalence: number
		reason: string
	}[]

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

	await db.batch(
		dualizable_implications.map((impl) => ({
			sql: `
            INSERT INTO implication_input (
                id,
                assumptions,
                conclusions,
                is_equivalence,
                reason,
                is_deduced,
                dualized_from
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			args: [
				`dual_${impl.id}`,
				impl.dual_assumptions,
				impl.dual_conclusions,
				impl.is_equivalence,
				'This follows from the dual implication.',
				true,
				impl.id,
			],
		})),
		'write',
	)

	console.info(`Dualized ${dualizable_implications.length} category implications`)
}

async function create_self_dual_category_implications(db: Client) {
	const { rows } = await db.execute(`
        INSERT INTO implication_input (
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
            properties p
        WHERE
            p.dual_property_id IS NOT NULL
            AND p.id != 'self-dual'
            AND p.id != p.dual_property_id
            AND p.invariant_under_equivalences = TRUE
        RETURNING id
    `)

	console.info(`Created ${rows.length} self-dual category implications`)
}
