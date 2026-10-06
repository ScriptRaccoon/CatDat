import { is_structure_type } from '#shared/config.js'
import { fetch_structures } from '#lib/server/fetchers/structures.js'
import { error } from '@sveltejs/kit'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return fetch_structures(type)
}
