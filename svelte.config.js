import adapter from '@sveltejs/adapter-netlify'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$components: './src/components',
			$pages: './src/pages',
			$shared: './shared'
		},
		adapter: adapter()
	}
}

export default config
