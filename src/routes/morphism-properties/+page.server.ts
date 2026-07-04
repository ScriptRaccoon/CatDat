import { fetch_grouped_properties_and_tags } from '$lib/server/fetchers/properties'

export const load = () => {
	return fetch_grouped_properties_and_tags('morphism')
}
