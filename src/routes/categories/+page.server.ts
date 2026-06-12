import { fetch_structures } from '$lib/server/fetchers/structures'

export const load = () => {
	return fetch_structures('category')
}
