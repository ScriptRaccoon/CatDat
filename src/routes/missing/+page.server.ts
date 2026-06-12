import { query } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type { StructureShort } from '$lib/commons/types'
import { error } from '@sveltejs/kit'
import { fetch_missing_data } from '$lib/server/fetchers/missing_data'

export const load = () => {
	const { rows: categories_with_missing_morphisms, err } = query<
		StructureShort & { count: number }
	>(
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
	)

	if (err) error(500, 'Failed to load data')

	const missing_category_data = fetch_missing_data('category')
	const missing_functor_data = fetch_missing_data('functor')

	return {
		structures_with_unknown_properties: {
			category: missing_category_data.structures_with_unknown_properties,
			functor: missing_functor_data.structures_with_unknown_properties,
		},
		unknown_totals: {
			category: missing_category_data.total_unknown_property_pairs,
			functor: missing_functor_data.total_unknown_property_pairs,
		},
		undistinguishable_pairs: {
			category: missing_category_data.undistinguishable_structure_pairs,
			functor: missing_functor_data.undistinguishable_structure_pairs,
		},
		missing_combinations: {
			category: missing_category_data.missing_combinations,
			functor: missing_functor_data.missing_combinations,
		},
		categories_with_missing_morphisms,
	}
}
