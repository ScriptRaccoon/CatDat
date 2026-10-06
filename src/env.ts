import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_PLAYWRIGHT: {
		public: true,
		static: true,
		description: 'Signals that Playwright tests run'
	},
	PUBLIC_ADMIN_URL: {
		public: true,
		static: true,
		description: 'URL of admin application that tracks visits etc.'
	}
})
