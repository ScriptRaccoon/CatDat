import type {
	CategoryDefinition,
	SpecialMorphism,
	SpecialObject,
	StructureShort
} from '$lib/commons/types'
import { db } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export function fetch_category(id: string) {
	const category = db
		.prepare<[string], CategoryDefinition>(
			`SELECT objects, morphisms FROM categories
			WHERE id = ?`
		)
		.get(id)

	if (!category) error(404, `Could not find category with ID '${id}'`)

	const special_objects = db
		.prepare<[string], SpecialObject>(
			`SELECT o.type, o.description
			FROM special_object_assignments o
			INNER JOIN special_object_types t
			ON t.type = o.type
			WHERE o.category_id = ?
			ORDER BY t.id`
		)
		.all(id)

	const special_morphisms = db
		.prepare<[string], SpecialMorphism>(
			`SELECT t.type, s.description, s.proof
			FROM special_morphism_types t
			LEFT JOIN special_morphism_assignments s
			ON s.type = t.type AND s.category_id = ?
			ORDER BY t.id`
		)
		.all(id)

	return {
		type: 'category' as const,
		...category,
		special_objects,
		special_morphisms
	}
}

export function fetch_categories_with_missing_morphisms() {
	return db
		.prepare<never[], StructureShort & { count: number }>(
			`SELECT
				s.id,
				s.name,
				COUNT(*) AS count
			FROM structures s
			JOIN special_morphism_types t
			LEFT JOIN special_morphism_assignments m
			ON m.category_id = s.id AND m.type = t.type
			WHERE s.type = 'category' AND m.type IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name)`
		)
		.all()
}
