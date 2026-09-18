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
			`SELECT soa.kind, soa.description
			FROM special_object_assignments soa
			INNER JOIN special_objects so
			ON so.kind = soa.kind
			WHERE soa.category_id = ?
			ORDER BY so.id`
		)
		.all(id)

	const special_morphisms = db
		.prepare<[string], SpecialMorphism>(
			`SELECT sm.kind, sma.description, sma.proof
			FROM special_morphisms sm
			LEFT JOIN special_morphism_assignments sma
			ON sma.kind = sm.kind AND sma.category_id = ?
			ORDER BY sm.id`
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
			JOIN special_morphisms sm
			LEFT JOIN special_morphism_assignments sma
			ON sma.category_id = s.id AND sma.kind = sm.kind
			WHERE s.type = 'category' AND sma.kind IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name)`
		)
		.all()
}
