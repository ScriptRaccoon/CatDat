import { is_structure_type } from '$lib/commons/structures'
import { fetch_comparison_result } from '$lib/server/fetchers/comparison'
import { cache_page } from '$lib/server/utils'
import { error } from '@sveltejs/kit'

export const prerender = false

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const compared_ids = event.params.ids.split('/')

	return fetch_comparison_result(compared_ids, type, () => {
		cache_page(event)
	})
}
