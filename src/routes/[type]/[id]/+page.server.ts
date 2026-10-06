import { render_nested_formulas } from '#lib/server/formulas.js'
import { fetch_structure } from '#lib/server/fetchers/structure.js'
import { is_structure_type } from '#shared/config.js'
import { error } from '@sveltejs/kit'
import { fetch_category } from '#lib/server/fetchers/category.js'
import { adjust_functor_notation } from '#lib/server/transforms.js'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const id = event.params.id

	const structure_data = fetch_structure(type, id)

	if (type === 'functor') adjust_functor_notation(structure_data)

	const special_structure_data = type === 'category' ? fetch_category(id) : { type }

	return render_nested_formulas({
		structure_data,
		special_structure_data
	})
}
