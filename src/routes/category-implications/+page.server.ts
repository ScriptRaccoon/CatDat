import { render_nested_formulas } from '$lib/server/formulas'
import { fetch_implications } from '$lib/server/fetchers/implications'

export const load = () => {
	const { implications } = fetch_implications('category')

	return render_nested_formulas({ implications })
}
