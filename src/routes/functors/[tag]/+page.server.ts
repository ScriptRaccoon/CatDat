import type { EntryGenerator } from './$types'
import { fetch_tagged_structures } from '$lib/server/fetchers/structures'
import { fetch_structure_tags } from '$lib/server/fetchers/tags'

export const entries: EntryGenerator = () => {
	return fetch_structure_tags('functor')
}

export const load = (event) => {
	const tag = event.params.tag
	return fetch_tagged_structures('functor', tag)
}
