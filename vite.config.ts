import adapter from '@sveltejs/adapter-netlify'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { defineConfig, type Plugin } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { UPDATE_MARKER_PATH } from './shared/db.ts'

/**
 * Reloads the browser when a database script marks the database as updated
 */
function reload_on_database_update(): Plugin {
	return {
		name: 'reload-on-database-update',
		apply: 'serve',
		configureServer(server) {
			server.watcher.add(UPDATE_MARKER_PATH)

			function on_change(file: string) {
				if (file === UPDATE_MARKER_PATH) server.ws.send({ type: 'full-reload' })
			}

			server.watcher.on('add', on_change).on('change', on_change)
		}
	}
}

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter()
		}),
		reload_on_database_update()
	]
})
