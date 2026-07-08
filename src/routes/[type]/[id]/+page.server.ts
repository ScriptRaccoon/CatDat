import { render_nested_formulas } from '$lib/server/formulas'
import { fetch_structure } from '$lib/server/fetchers/structure'
import { is_structure_type } from '$lib/commons/structures'
import { error } from '@sveltejs/kit'
import { fetch_category } from '$lib/server/fetchers/category'
import { fetch_functor } from '$lib/server/fetchers/functor'
import { fetch_morphism } from '$lib/server/fetchers/morphism'
import { add_math, strip_math } from '$lib/server/utils'

const special_fetchers = {
	category: fetch_category,
	functor: fetch_functor,
	morphism: fetch_morphism
}

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const id = event.params.id

	const structure_data = fetch_structure(type, id)

	const special_structure_data = special_fetchers[type](id)

	if (special_structure_data.type === 'functor') {
		structure_data.structure.notation = add_math(
			`${strip_math(structure_data.structure.notation)}: ${strip_math(special_structure_data.source_notation)} \\to ${strip_math(special_structure_data.target_notation)}`
		)
	}

	return render_nested_formulas({
		structure_data,
		special_structure_data
	})
}
