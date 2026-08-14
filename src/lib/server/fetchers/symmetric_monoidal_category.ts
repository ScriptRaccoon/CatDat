import type { RelatedStructure } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_symmetric_monoidal_category(id: string) {
	// TODO: generalize this

	const underlying_category = db
		.prepare<[string], RelatedStructure>(
			`SELECT
				s.id,
				s.name,
				s.notation
			FROM structure_map_assignments a
			INNER JOIN structures s
			ON s.id = a.mapped_structure_id 
			WHERE
				a.type = 'symmetric_monoidal_category'
				AND a.structure_id = ?
				AND a.map = 'underlying_category'`
		)
		.get(id)

	if (!underlying_category) {
		error(
			404,
			`No underlying category found for symmetric monoidal category with ID ${id}`
		)
	}

	return { type: 'symmetric_monoidal_category' as const, underlying_category }
}
