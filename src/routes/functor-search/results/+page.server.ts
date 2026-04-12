import { search_handler } from '$lib/server/search'

export const prerender = false

export const load = async (event) => {
	return await search_handler(event, 'functor')
}
