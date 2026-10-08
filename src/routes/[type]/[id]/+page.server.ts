import { render_nested_text } from '#lib/server/text.ts'
import { fetch_structure } from '#lib/server/fetchers/structure.ts'
import { is_structure_type } from '#shared/config.ts'
import { error } from '@sveltejs/kit'
import { fetch_category } from '#lib/server/fetchers/category.ts'
import { adjust_functor_notation } from '#lib/server/transforms.ts'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const id = event.params.id

	const structure_data = fetch_structure(type, id)

	if (type === 'functor') adjust_functor_notation(structure_data)

	const special_structure_data = type === 'category' ? fetch_category(id) : { type }

	return render_nested_text({
		structure_data,
		special_structure_data
	})
}
