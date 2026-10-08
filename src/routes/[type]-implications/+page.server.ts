import { render_nested_text } from '#lib/server/text.ts'
import { fetch_implications } from '#lib/server/fetchers/implications.ts'
import { is_structure_type } from '#shared/config.ts'
import { error } from '@sveltejs/kit'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return render_nested_text(fetch_implications(type))
}
