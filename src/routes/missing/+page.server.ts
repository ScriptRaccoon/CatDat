import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type { StructureShort } from '$lib/commons/types'
import { error } from '@sveltejs/kit'
import { get_missing_combinations } from '$lib/server/consistency'

type StructurePair = { id1: string; name1: string; id2: string; name2: string }

export const load = () => {
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
			SELECT s.id, s.name, COUNT(*) AS count
			FROM structures s
			INNER JOIN properties p
			LEFT JOIN property_assignments cp
				ON cp.structure_id = s.id
				AND cp.property_id = p.id
			WHERE
				p.type = 'category'
				AND s.type = 'category'
				AND cp.property_id IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name);
		`,
		// functors with unknown properties
		sql`
			SELECT s.id, s.name, COUNT(*) AS count
			FROM structures s
			INNER JOIN properties p
			LEFT JOIN property_assignments fp
				ON fp.structure_id = s.id
				AND fp.property_id = p.id
			WHERE
				p.type = 'functor'
				AND s.type = 'functor'
				AND fp.property_id IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name);
		`,
		// categories with missing special morphisms
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
		// undistinguishable category pairs
		sql`
			SELECT
				s1.id AS id1, s1.name AS name1,
				s2.id AS id2, s2.name AS name2
			FROM structures s1
			JOIN structures s2
				ON s1.id < s2.id
			JOIN properties p
			LEFT JOIN property_assignments a1
				ON a1.structure_id = s1.id AND a1.property_id = p.id
			LEFT JOIN property_assignments a2
				ON a2.structure_id = s2.id AND a2.property_id = p.id
			WHERE
				p.type = 'category'
				AND s1.type = 'category'
				AND s2.type = 'category'
			GROUP BY s1.id, s1.name, s2.id, s2.name
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
				s1.id AS id1, s1.name AS name1,
				s2.id AS id2, s2.name AS name2
			FROM structures s1
			JOIN structures s2
				ON s1.id < s2.id
			JOIN properties p
			LEFT JOIN property_assignments a1
				ON a1.structure_id = s1.id AND a1.property_id = p.id
			LEFT JOIN property_assignments a2
				ON a2.structure_id = s2.id AND a2.property_id = p.id
			WHERE
				p.type = 'functor'
				AND s1.type = 'functor'
				AND s2.type = 'functor'
			GROUP BY s1.id, s1.name, s2.id, s2.name
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

	const { missing_combinations: missing_category_combinations, err: err_cat_missing } =
		get_missing_combinations('category')

	if (err_cat_missing) error(500, 'Failed to load missing category combinations')

	const { missing_combinations: missing_functor_combinations, err: err_fun_missing } =
		get_missing_combinations('functor')

	if (err_fun_missing) error(500, 'Failed to load missing functor combinations')

	return {
		structures_with_unknown_properties: {
			category: categories_with_unknown_properties,
			functor: functors_with_unknown_properties,
		},
		unknown_totals: {
			category: total_unknown_category_property_pairs,
			functor: total_unknown_functor_property_pairs,
		},
		undistinguishable_pairs: {
			category: undistinguishable_category_pairs,
			functor: undistinguishable_functor_pairs,
		},
		missing_combinations: {
			category: missing_category_combinations,
			functor: missing_functor_combinations,
		},
		categories_with_missing_morphisms,
	}
}
