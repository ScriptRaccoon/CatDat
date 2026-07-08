import type { FunctorSpecificDisplay } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_functor(id: string) {
	const functor = db
		.prepare<[string], FunctorSpecificDisplay>(
			`SELECT
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
            WHERE f.id = ?`
		)
		.get(id)

	if (!functor) error(404, `Could not find functor with ID '${id}'`)

	return { type: 'functor' as const, ...functor }
}
