import { fetch_tagged_structures } from '#lib/server/fetchers/structures.js'
import { is_structure_type } from '#shared/config.js'
import { error } from '@sveltejs/kit'
import type { EntryGenerator } from './$types'
import { fetch_structure_tags } from '#lib/server/fetchers/tags.js'

export const entries: EntryGenerator = () => {
	return fetch_structure_tags()
}

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return fetch_tagged_structures(type, event.params.tag)
}
