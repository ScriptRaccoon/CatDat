import { fetch_implication } from '$lib/server/fetchers/implication'
import { render_nested_formulas } from '$lib/server/formulas'

export const load = (event) => {
	const id = event.params.id

	const { implication, structures } = fetch_implication('functor', id)

	return render_nested_formulas({ implication, structures })
}
