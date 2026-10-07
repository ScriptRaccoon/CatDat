import { render_nested_formulas } from '#lib/server/formulas.ts'
import { decode_property_ID } from '#shared/property.utils.ts'
import { fetch_property } from '#lib/server/fetchers/property.ts'
import { is_structure_type } from '#shared/config.ts'
import { error } from '@sveltejs/kit'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const id = decode_property_ID(event.params.id)

	return render_nested_formulas(fetch_property(type, id))
}
