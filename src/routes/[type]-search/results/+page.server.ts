import { is_structure_type } from '$shared/config'
import { fetch_search_results } from '$lib/server/fetchers/search'
import { cache_page } from '$lib/server/utils'
import { error } from '@sveltejs/kit'

export const prerender = false

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	const satisfied_query = event.url.searchParams.get('satisfied')
	const unsatisfied_query = event.url.searchParams.get('unsatisfied')

	return fetch_search_results(satisfied_query, unsatisfied_query, type, () =>
		cache_page(event)
	)
}
