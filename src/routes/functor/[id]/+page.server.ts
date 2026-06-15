import { fetch_functor } from '$lib/server/fetchers/functor'
import { fetch_structure } from '$lib/server/fetchers/structure'
import { render_nested_formulas } from '$lib/server/formulas'

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
	} = fetch_structure('functor', id)

	const functor = fetch_functor(id)

	return render_nested_formulas({
		structure,
		functor,
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
