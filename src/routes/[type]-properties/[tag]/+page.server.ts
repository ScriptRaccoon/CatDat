import { is_structure_type } from '$shared/config'
import { fetch_tagged_properties } from '$lib/server/fetchers/properties'
import { error } from '@sveltejs/kit'
import type { EntryGenerator } from './$types'
import { fetch_property_tags } from '$lib/server/fetchers/tags'

export const entries: EntryGenerator = () => {
	return fetch_property_tags()
}

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return fetch_tagged_properties(type, event.params.tag)
}
