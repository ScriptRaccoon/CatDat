import { fetch_missing_data } from '$lib/server/fetchers/missing_data'
import { fetch_categories_with_missing_morphisms } from '$lib/server/fetchers/category'

export const load = () => {
	const categories_with_missing_morphisms = fetch_categories_with_missing_morphisms()

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
