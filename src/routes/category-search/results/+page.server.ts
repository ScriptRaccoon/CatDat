import { search_handler } from '$lib/server/search'

export const prerender = false

export const load = (event) => {
	return search_handler(event, 'category')
}
