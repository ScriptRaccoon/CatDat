import { is_structure_type } from '$lib/commons/structures'
import { fetch_structures_and_tags } from '$lib/server/fetchers/structures'
import { error } from '@sveltejs/kit'
import type { EntryGenerator } from './$types'
import { STRUCTURE_TYPES } from '$shared/config'

export const entries: EntryGenerator = () => {
	return STRUCTURE_TYPES.map((type) => ({ type }))
}

export const load = (event) => {
	const type = event.params.type
	if (!is_structure_type(type)) error(404, `Invalid structure type: ${type}`)

	return fetch_structures_and_tags(type)
}
