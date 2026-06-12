import { render_nested_formulas } from '$lib/server/formulas'
import { decode_property_ID } from '$lib/commons/property.url'
import { fetch_property } from '$lib/server/fetchers/property'

export const load = (event) => {
	const id = decode_property_ID(event.params.id)

	const property_data = fetch_property('category', id)

	return render_nested_formulas(property_data)
}
