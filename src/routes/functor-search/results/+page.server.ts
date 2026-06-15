import { fetch_search_results } from '$lib/server/fetchers/search'
import { cache_page } from '$lib/server/utils'

export const prerender = false

export const load = (event) => {
	const satisfied_query = event.url.searchParams.get('satisfied')
	const unsatisfied_query = event.url.searchParams.get('unsatisfied')

	return fetch_search_results(satisfied_query, unsatisfied_query, 'functor', () =>
		cache_page(event),
	)
}
