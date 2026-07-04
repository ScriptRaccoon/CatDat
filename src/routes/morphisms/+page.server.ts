import { fetch_structures_and_tags } from '$lib/server/fetchers/structures'

export const load = () => {
	return fetch_structures_and_tags('morphism')
}
