import type { RelatedStructure } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_functor(id: string) {
	// TODO: refactor this function

	const domain = db
		.prepare<[string], RelatedStructure>(
			`SELECT
                s.id,
                s.name,
                s.notation
            FROM structure_map_assignments a
            INNER JOIN structures s
            ON s.id = a.mapped_structure_id 
            WHERE
                a.type = 'functor'
                AND a.structure_id = ?
                AND a.map = 'domain'`
		)
		.get(id)

	if (!domain) error(404, `No domain found for functor with ID ${id}`)

	const codomain = db
		.prepare<[string], RelatedStructure>(
			`SELECT
                s.id,
                s.name,
                s.notation
            FROM structure_map_assignments a
            INNER JOIN structures s
            ON s.id = a.mapped_structure_id 
            WHERE
                a.type = 'functor'
                AND a.structure_id = ?
                AND a.map = 'codomain'`
		)
		.get(id)

	if (!codomain) error(404, `No codomain found for functor with ID ${id}`)

	const left_adjoint = db
		.prepare<[string], RelatedStructure>(
			`SELECT
                s.id,
                s.name,
                s.notation
            FROM functors f
            INNER JOIN structures s
            ON s.id = f.left_adjoint
            WHERE f.id = ?`
		)
		.get(id)

	const right_adjoint = db
		.prepare<[string], RelatedStructure>(
			`SELECT
                s.id,
                s.name,
                s.notation
            FROM functors f
            INNER JOIN structures s
            ON s.id = f.id
            WHERE f.left_adjoint = ?`
		)
		.get(id)

	return {
		type: 'functor' as const,
		domain,
		codomain,
		left_adjoint,
		right_adjoint
	}
}
