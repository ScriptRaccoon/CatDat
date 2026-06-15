import { fetch_comparison_result } from '$lib/server/fetchers/comparison'
import { cache_page } from '$lib/server/utils'

export const prerender = false

export const load = (event) => {
	const compared_ids = event.params.ids.split('/')

	return fetch_comparison_result(compared_ids, 'functor', () => {
		cache_page(event)
	})
}
