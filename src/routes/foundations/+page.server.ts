import { get_rendered_content } from '$lib/server/rendering'

export const load = async () => {
	const content = get_rendered_content('foundations')
	return { content }
}
