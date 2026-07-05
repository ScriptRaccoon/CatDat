import { render_nested_formulas } from '$lib/server/formulas'
import { fetch_structure } from '$lib/server/fetchers/structure'
import { is_structure_type } from '$lib/commons/structures'
import { error } from '@sveltejs/kit'
import { fetch_category } from '$lib/server/fetchers/category'
import { fetch_functor } from '$lib/server/fetchers/functor'
import { fetch_morphism } from '$lib/server/fetchers/morphism'
import { add_math, strip_math } from '$lib/server/utils'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const id = event.params.id

	const structure_data = fetch_structure(type, id)

	// TODO: improve this mess

	const special_structure_data =
		type === 'category'
			? { category: fetch_category(id) }
			: type === 'functor'
				? { functor: fetch_functor(id) }
				: { morphism: fetch_morphism(id) }

	if (type === 'functor' && special_structure_data.functor) {
		structure_data.structure.notation = add_math(
			`${strip_math(structure_data.structure.notation)}: ${strip_math(special_structure_data.functor.source_notation)} \\to ${strip_math(special_structure_data.functor.target_notation)}`,
		)
	}

	return render_nested_formulas({
		special_structure_data,
		...structure_data,
	})
}
