import adapter from '@sveltejs/adapter-netlify'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { defineConfig, type Plugin } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { UPDATE_MARKER_PATH } from './shared/db.ts'
import path from 'node:path'

const CONTENT_FOLDER = path.resolve('content')

/**
 * Reloads the browser when a database script marks the database as updated
 * or when a content page is edited
 */
function reload_on_data_update(): Plugin {
	return {
		name: 'reload-on-data-update',
		apply: 'serve',
		configureServer(server) {
			server.watcher.add([UPDATE_MARKER_PATH, CONTENT_FOLDER])

			function on_change(file: string) {
				const is_content_page =
					path.dirname(file) === CONTENT_FOLDER && file.endsWith('.md')
				if (file === UPDATE_MARKER_PATH || is_content_page) {
					server.ws.send({ type: 'full-reload' })
				}
			}

			server.watcher
				.on('add', on_change)
				.on('change', on_change)
				.on('unlink', on_change)
		}
	}
}

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter()
		}),
		reload_on_data_update()
	]
})
