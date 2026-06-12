import { get_property_ids } from '$lib/server/fetchers/properties'

export const load = () => {
	return { all_properties: get_property_ids('category') }
}
