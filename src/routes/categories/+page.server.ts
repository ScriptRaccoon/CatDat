import { fetch_structures_with_tags } from '$lib/server/fetchers/structures'

export const load = () => {
	return fetch_structures_with_tags('category')
}
