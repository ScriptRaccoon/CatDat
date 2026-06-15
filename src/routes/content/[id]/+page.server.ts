import { get_rendered_content } from '$lib/server/markdown'
import { error } from '@sveltejs/kit'
import { fetch_category_references } from '$lib/server/fetchers/content'

export const load = (event) => {
	const id = event.params.id

	const content = get_rendered_content(id)
	if (!content) error(404, 'Not Found')

	const category_references = fetch_category_references(id)

	return { ...content, ...category_references }
}
