import { is_structure_type } from '#shared/config.ts'
import { fetch_implication } from '#lib/server/fetchers/implication.ts'
import { render_nested_text } from '#lib/server/text.ts'
import { error } from '@sveltejs/kit'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const id = event.params.id

	return render_nested_text(fetch_implication(type, id))
}
