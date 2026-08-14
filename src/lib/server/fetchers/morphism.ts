import type { RelatedStructure } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_morphism(id: string) {
	// TODO: generalize this to all structures

	const category = db
		.prepare<[string], RelatedStructure>(
			`SELECT
				s.id,
				s.name,
				s.notation
			FROM structure_map_assignments a
			INNER JOIN structures s
			ON s.id = a.mapped_structure_id 
			WHERE
				a.type = 'morphism'
				AND a.structure_id = ?
				AND a.map = 'category'`
		)
		.get(id)

	if (!category) {
		error(404, `Could not find the category of the morphism with ID '${id}'`)
	}

	return { type: 'morphism' as const, category }
}
