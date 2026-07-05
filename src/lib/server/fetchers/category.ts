import type { SpecialMorphism, SpecialObject, StructureShort } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { batch, query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'

export function fetch_category(id: string) {
	const { results, err } = batch<
		[
			{ objects: string; morphisms: string },
			SpecialObject,
			SpecialMorphism,
			StructureShort,
		]
	>([
		// specific information for the category
		sql`
			SELECT c.objects, c.morphisms
			FROM categories c
			WHERE c.id = ${id}
		`,
		// special objects
		sql`
			SELECT s.type, s.description
			FROM special_objects s
			INNER JOIN special_object_types t ON t.type = s.type
			WHERE s.category_id = ${id}
			ORDER BY t.id
		`,
		// special morphisms
		sql`
			SELECT t.type, s.description, s.proof
			FROM special_morphism_types t
			LEFT JOIN special_morphisms s
				ON s.type = t.type AND s.category_id = ${id}
			ORDER BY t.id
		`,
		// functors whose source or target is the current category
		sql`
			SELECT f.id, s.name
			FROM functors f
			INNER JOIN structures s ON s.id = f.id
			WHERE f.source = ${id} OR f.target = ${id}
			ORDER BY lower(s.name)
		`,
	])

	if (err) error(500, 'Could not load category')

	const [categories, special_objects, special_morphisms, functors] = results

	if (!categories.length) error(404, `Could not find category with ID '${id}'`)

	return {
		type: 'category' as const,
		...categories[0],
		special_objects,
		special_morphisms,
		functors,
	}
}

export function fetch_categories_with_missing_morphisms() {
	const { rows, err } = query<StructureShort & { count: number }>(
		sql`
			SELECT s.id, s.name, COUNT(*) AS count
			FROM structures s
			JOIN special_morphism_types t
			LEFT JOIN special_morphisms m
				ON m.category_id = s.id AND m.type = t.type
			WHERE s.type = 'category' AND m.type IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name);
		`,
	)

	if (err) error(500, 'Failed to load data')

	return rows
}
