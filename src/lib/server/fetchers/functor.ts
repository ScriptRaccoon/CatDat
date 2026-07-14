import type { FunctorSpecificDisplay } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_functor(id: string) {
	const functor = db
		.prepare<[string], FunctorSpecificDisplay>(
			`SELECT
                f.domain,
                f.codomain,
                domain.name AS domain_name,
                domain.notation AS domain_notation,
                codomain.name AS codomain_name,
                codomain.notation AS codomain_notation,
                la.id AS left_adjoint,
                la.name AS left_adjoint_name,
                la.notation AS left_adjoint_notation,
                ra.id AS right_adjoint,
                ra.name AS right_adjoint_name,
                ra.notation AS right_adjoint_notation
            FROM functors f
            INNER JOIN structures AS domain ON domain.id = f.domain
            INNER JOIN structures AS codomain ON codomain.id = f.codomain
            LEFT JOIN structures AS la ON la.id = f.left_adjoint
            LEFT JOIN functors AS rf ON rf.left_adjoint = f.id
            LEFT JOIN structures AS ra ON ra.id = rf.id
            WHERE f.id = ?`
		)
		.get(id)

	if (!functor) error(404, `Could not find functor with ID '${id}'`)

	return { type: 'functor' as const, ...functor }
}
