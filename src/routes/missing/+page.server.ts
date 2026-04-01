import { batch } from '$lib/server/db'
import sql from 'sql-template-tag'
import type { CategoryShort } from '$lib/commons/types'
import { error } from '@sveltejs/kit'
import { get_missing_combinations } from '$lib/server/consistency'

type CategoryPairShort = { id1: string; name1: string; id2: string; name2: string }

export const load = async () => {
	const { results, err } = await batch<
		[
			CategoryShort & { count: number },
			CategoryShort & { count: number },
			CategoryShort & { count: number },
			CategoryPairShort,
		]
	>([
		// missing special morphisms
		sql`
			SELECT c.id, c.name, COUNT(*) AS count
			FROM categories c
			JOIN special_morphism_types t
			LEFT JOIN special_morphisms s
				ON s.category_id = c.id AND s.type = t.type
			WHERE s.type IS NULL
			GROUP BY c.id
			ORDER BY lower(c.name);
		`,
		// categories with unknown properties
		sql`
			SELECT c.id, c.name, COUNT(*) AS count
			FROM categories c
			INNER JOIN properties p
			LEFT JOIN category_property_assignments cp
				ON cp.category_id = c.id
				AND cp.property_id = p.id
			WHERE cp.property_id IS NULL
			GROUP BY c.id
			ORDER BY lower(c.name);
		`,
		// missing reasons
		sql`
			SELECT c.id, c.name, COUNT(*) AS count
			FROM categories c
			JOIN category_property_assignments cp
				ON cp.category_id = c.id
			WHERE cp.reason IS NULL
			GROUP BY c.id
			ORDER BY lower(c.name);
		`,
		// undistinguishable category pairs
		sql`
			SELECT
				c1.id AS id1, c1.name AS name1,
				c2.id AS id2, c2.name AS name2
			FROM categories c1
			JOIN categories c2
				ON c1.id < c2.id
			JOIN properties p
			LEFT JOIN category_property_assignments a1
				ON a1.category_id = c1.id AND a1.property_id = p.id
			LEFT JOIN category_property_assignments a2
				ON a2.category_id = c2.id AND a2.property_id = p.id
			GROUP BY c1.id, c1.name, c2.id, c2.name
			HAVING SUM(
			CASE
				WHEN a1.is_satisfied IS a2.is_satisfied THEN 0
				ELSE 1
			END
			) = 0;
		`,
	])

	if (err) error(500, 'Failed to load data')

	const [
		categories_with_missing_morphisms,
		categories_with_unknown_properties,
		categories_with_unreasoned_properties,
		undistinguishable_category_pairs,
	] = results

	const missing_combinations = await get_missing_combinations()

	return {
		categories_with_unknown_properties,
		categories_with_missing_morphisms,
		categories_with_unreasoned_properties,
		undistinguishable_category_pairs,
		missing_combinations,
	}
}
