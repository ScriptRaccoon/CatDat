import type { SymmetricMonoidalCategorySpecificDisplay } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_symmetric_monoidal_category(id: string) {
	const s = db
		.prepare<[string], SymmetricMonoidalCategorySpecificDisplay>(
			`SELECT
                c.id AS underlying_category,
                c.name AS underlying_category_name,
                c.notation AS underlying_category_notation
            FROM symmetric_monoidal_categories s
            INNER JOIN structures AS c ON c.id = s.underlying_category
            WHERE s.id = ?`
		)
		.get(id)

	if (!s) error(404, `Could not find symmetric monoidal category with ID '${id}'`)

	return { type: 'symmetric_monoidal_category' as const, ...s }
}
