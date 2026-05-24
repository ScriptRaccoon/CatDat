import { get_property_ids } from '$lib/server/properties'

export const load = async () => {
	return { all_properties: get_property_ids('category') }
}
