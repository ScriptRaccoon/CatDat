import { get_content_pages } from '#lib/server/markdown.js'

export const load = () => {
	return { pages: get_content_pages() }
}
