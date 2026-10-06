import { is_structure_type } from '#shared/config.js'
import { fetch_implication } from '#lib/server/fetchers/implication.js'
import { render_nested_formulas } from '#lib/server/formulas.js'
import { error } from '@sveltejs/kit'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const id = event.params.id

	return render_nested_formulas(fetch_implication(type, id))
}
