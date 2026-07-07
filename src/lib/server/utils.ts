import type { RequestEvent } from '@sveltejs/kit'

export function cache_page(event: RequestEvent) {
	// shared cache for 30min
	event.setHeaders({ 'cache-control': 'public, max-age=0, s-maxage=1800' })
}
