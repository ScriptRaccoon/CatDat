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
			`SELECT c.objects, c.morphisms
			FROM categories c
			WHERE c.id = ?`
		)
		.get(id)

	if (!category) error(404, `Could not find category with ID '${id}'`)

	const special_objects = db
		.prepare<[string], SpecialObject>(
			`SELECT s.type, s.description
			FROM special_objects s
			INNER JOIN special_object_types t
			ON t.type = s.type
			WHERE s.category_id = ?
			ORDER BY t.id`
		)
		.all(id)

	const special_morphisms = db
		.prepare<[string], SpecialMorphism>(
			`SELECT t.type, s.description, s.proof
			FROM special_morphism_types t
			LEFT JOIN special_morphisms s
			ON s.type = t.type AND s.category_id = ?
			ORDER BY t.id`
		)
		.all(id)

	const functors = db
		.prepare<[string, string], StructureShort>(
			`SELECT f.id, s.name
			FROM functors f
			INNER JOIN structures s ON s.id = f.id
			WHERE f.source = ? OR f.target = ?
			ORDER BY lower(s.name)`
		)
		.all(id, id)

	return {
		type: 'category' as const,
		...category,
		special_objects,
		special_morphisms,
		functors
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
			LEFT JOIN special_morphisms m
			ON m.category_id = s.id AND m.type = t.type
			WHERE s.type = 'category' AND m.type IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name)`
		)
		.all()
}
