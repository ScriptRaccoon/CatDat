import { content_ids, get_rendered_content } from '$lib/server/rendering'
import { error } from '@sveltejs/kit'
import type { EntryGenerator } from './$types'

export const entries: EntryGenerator = () => {
	return content_ids.map((id) => ({ id }))
}

export const load = async (event) => {
	const id = event.params.id
	const content = get_rendered_content(id)
	if (!content) error(404, 'Not Found')
	return content
}
