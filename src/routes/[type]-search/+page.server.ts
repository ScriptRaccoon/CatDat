import { is_structure_type } from '$shared/config'
import { get_property_ids } from '$lib/server/fetchers/properties'
import { error } from '@sveltejs/kit'

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return { all_properties: get_property_ids(type), type }
}
