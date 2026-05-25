import { compare_handler } from '$lib/server/compare'

export const prerender = false

export const load = async (event) => {
	return compare_handler(event, 'functor')
}
