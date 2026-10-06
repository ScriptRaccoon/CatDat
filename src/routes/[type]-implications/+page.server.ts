import { render_nested_formulas } from '#lib/server/formulas.js'
import { fetch_implications } from '#lib/server/fetchers/implications.js'
import { is_structure_type } from '#shared/config.js'
import { error } from '@sveltejs/kit'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return render_nested_formulas(fetch_implications(type))
}
