import { get_property_ids } from '$lib/server/properties'

export const load = () => {
	return { all_properties: get_property_ids('functor') }
}
