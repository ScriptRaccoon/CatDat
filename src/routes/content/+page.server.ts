import { get_content_pages } from '$lib/server/markdown'

export const load = () => {
	return { pages: get_content_pages() }
}
