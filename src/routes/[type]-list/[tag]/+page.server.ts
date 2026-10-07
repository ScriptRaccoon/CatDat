import { fetch_tagged_structures } from '#lib/server/fetchers/structures.ts'
import { is_structure_type } from '#shared/config.ts'
import { error } from '@sveltejs/kit'
import type { EntryGenerator } from './$types'
import { fetch_structure_tags } from '#lib/server/fetchers/tags.ts'

export const entries: EntryGenerator = () => {
	return fetch_structure_tags()
}

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return fetch_tagged_structures(type, event.params.tag)
}
