import { fetch_tagged_properties } from '$lib/server/fetchers/properties'
import { fetch_property_tags } from '$lib/server/fetchers/tags'
import type { EntryGenerator } from './$types'

export const entries: EntryGenerator = () => {
	return fetch_property_tags('category')
}

export const load = (event) => {
	return fetch_tagged_properties('category', event.params.tag)
}
