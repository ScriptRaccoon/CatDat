import { get_content_pages } from '#lib/server/markdown.ts'

export const load = () => {
	return { pages: get_content_pages() }
}
