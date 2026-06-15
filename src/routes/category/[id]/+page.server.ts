import { render_nested_formulas } from '$lib/server/formulas'
import { fetch_structure } from '$lib/server/fetchers/structure'
import { fetch_category } from '$lib/server/fetchers/category'

export const load = (event) => {
	const id = event.params.id

	const {
		structure,
		related_structures,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		undistinguishable_structures,
		comments,
	} = fetch_structure('category', id)

	const category = fetch_category(id)

	return render_nested_formulas({
		structure,
		category,
		related_structures,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		undistinguishable_structures,
		comments,
	})
}
