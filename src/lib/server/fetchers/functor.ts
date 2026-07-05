import type { FunctorSpecificDisplay } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'

export function fetch_functor(id: string) {
	const { rows: functors, err } = query<FunctorSpecificDisplay>(
		// specific information for the functor
		sql`
            SELECT
                f.source,
                f.target,
                source.name AS source_name,
                source.notation AS source_notation,
                target.name AS target_name,
                target.notation AS target_notation,
                la.id AS left_adjoint,
                la.name AS left_adjoint_name,
                la.notation AS left_adjoint_notation,
                ra.id AS right_adjoint,
                ra.name AS right_adjoint_name,
                ra.notation AS right_adjoint_notation
            FROM functors f
            INNER JOIN structures AS source ON source.id = f.source
            INNER JOIN structures AS target ON target.id = f.target
            LEFT JOIN structures AS la ON la.id = f.left_adjoint
            LEFT JOIN functors AS rf ON rf.left_adjoint = f.id
            LEFT JOIN structures AS ra ON ra.id = rf.id
            WHERE f.id = ${id}
        `,
	)

	if (err) error(500, 'Could not load functor')

	if (!functors.length) error(404, `Could not find functor with ID '${id}'`)

	return { type: 'functor' as const, ...functors[0] }
}
