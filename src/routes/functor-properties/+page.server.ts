import { get_grouped_properties } from '$lib/server/fetchers/properties'

export const load = () => {
	return get_grouped_properties('functor')
}
