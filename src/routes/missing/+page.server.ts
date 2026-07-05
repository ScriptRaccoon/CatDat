import { fetch_missing_data } from '$lib/server/fetchers/missing_data'
import { fetch_categories_with_missing_morphisms } from '$lib/server/fetchers/category'
import { STRUCTURE_TYPES } from '$lib/commons/structures'

export const load = () => {
	const categories_with_missing_morphisms = fetch_categories_with_missing_morphisms()

	const missing_data = Object.fromEntries(
		STRUCTURE_TYPES.map((type) => [type, fetch_missing_data(type)]),
	)

	function select<T>(
		selector: (data: (typeof missing_data)[keyof typeof missing_data]) => T,
	) {
		return Object.fromEntries(
			STRUCTURE_TYPES.map((type) => [type, selector(missing_data[type])]),
		)
	}

	return {
		structures_with_unknown_properties: select(
			(data) => data.structures_with_unknown_properties,
		),
		unknown_totals: select((data) => data.total_unknown_property_pairs),
		undistinguishable_pairs: select((data) => data.undistinguishable_structure_pairs),
		missing_combinations: select((data) => data.missing_combinations),
		categories_with_missing_morphisms,
	}
}
