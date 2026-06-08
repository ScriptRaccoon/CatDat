import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type { StructureShort } from '$lib/commons/types'
import { error } from '@sveltejs/kit'
import { get_missing_combinations } from '$lib/server/consistency'

type StructurePair = { id1: string; name1: string; id2: string; name2: string }

export const load = async () => {
	const { results, err } = batch<
		[
			StructureShort & { count: number },
			StructureShort & { count: number },
			StructureShort & { count: number },
			StructurePair,
			StructurePair,
		]
	>([
		// categories with unknown properties
		sql`
			SELECT c.id, c.name, COUNT(*) AS count
			FROM categories c
			INNER JOIN category_properties p
			LEFT JOIN category_property_assignments cp
				ON cp.category_id = c.id
				AND cp.property_id = p.id
			WHERE cp.property_id IS NULL
			GROUP BY c.id
			ORDER BY lower(c.name);
		`,
		// functors with unknown properties
		sql`
			SELECT f.id, f.name, COUNT(*) AS count
			FROM functors f
			INNER JOIN functor_properties p
			LEFT JOIN functor_property_assignments fp
				ON fp.functor_id = f.id
				AND fp.property_id = p.id
			WHERE fp.property_id IS NULL
			GROUP BY f.id
			ORDER BY lower(f.name);
		`,
		// categories with missing special morphisms
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
		// undistinguishable category pairs
		sql`
			SELECT
				c1.id AS id1, c1.name AS name1,
				c2.id AS id2, c2.name AS name2
			FROM categories c1
			JOIN categories c2
				ON c1.id < c2.id
			JOIN category_properties p
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
		// undistinguishable functor pairs
		sql`
			SELECT
				f1.id AS id1, f1.name AS name1,
				f2.id AS id2, f2.name AS name2
			FROM functors f1
			JOIN functors f2
				ON f1.id < f2.id
			JOIN functor_properties p
			LEFT JOIN functor_property_assignments a1
				ON a1.functor_id = f1.id AND a1.property_id = p.id
			LEFT JOIN functor_property_assignments a2
				ON a2.functor_id = f2.id AND a2.property_id = p.id
			GROUP BY f1.id, f1.name, f2.id, f2.name
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
		categories_with_unknown_properties,
		functors_with_unknown_properties,
		categories_with_missing_morphisms,
		undistinguishable_category_pairs,
		undistinguishable_functor_pairs,
	] = results

	const total_unknown_category_property_pairs =
		categories_with_unknown_properties.reduce((total, item) => item.count + total, 0)

	const total_unknown_functor_property_pairs = functors_with_unknown_properties.reduce(
		(total, item) => item.count + total,
		0,
	)

	const { missing_combinations, err: err_missing } = get_missing_combinations()

	if (err_missing) error(500, 'Failed to load missing combinations')

	return {
		categories_with_unknown_properties,
		total_unknown_category_property_pairs,
		functors_with_unknown_properties,
		total_unknown_functor_property_pairs,
		categories_with_missing_morphisms,
		undistinguishable_category_pairs,
		undistinguishable_functor_pairs,
		missing_combinations,
	}
}
