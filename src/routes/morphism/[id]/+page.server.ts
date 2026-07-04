import { fetch_morphism } from '$lib/server/fetchers/morphism'
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
	} = fetch_structure('morphism', id)

	const morphism = fetch_morphism(id)

	return render_nested_formulas({
		structure,
		morphism,
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
