import type { MorphismSpecificDisplay } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'

export function fetch_morphism(id: string) {
	const { rows: morphisms, err } = query<MorphismSpecificDisplay>(
		// specific information for the morphism
		sql`
            SELECT
                c.id AS ambient_category,
                c.name AS ambient_category_name,
                c.notation AS ambient_category_notation
            FROM morphisms m
            INNER JOIN structures AS c ON c.id = m.ambient_category
            WHERE m.id = ${id}
        `,
	)

	if (err) error(500, 'Could not load morphism')

	if (!morphisms.length) error(404, `Could not find morphism with ID '${id}'`)

	return morphisms[0]
}
