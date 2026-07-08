import type { MorphismSpecificDisplay } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_morphism(id: string) {
	const morphism = db
		.prepare<[string], MorphismSpecificDisplay>(
			`SELECT
                c.id AS category,
                c.name AS category_name,
                c.notation AS category_notation
            FROM morphisms m
            INNER JOIN structures AS c ON c.id = m.category
            WHERE m.id = ?`
		)
		.get(id)

	if (!morphism) error(404, `Could not find morphism with ID '${id}'`)

	return { type: 'morphism' as const, ...morphism }
}
