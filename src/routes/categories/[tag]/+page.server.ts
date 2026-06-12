import type { EntryGenerator } from './$types'
import { fetch_tagged_structures } from '$lib/server/fetchers/structures'
import { fetch_tags } from '$lib/server/fetchers/tags'

export const entries: EntryGenerator = () => {
	return fetch_tags('category')
}

export const load = (event) => {
	return fetch_tagged_structures('category', event.params.tag)
}
