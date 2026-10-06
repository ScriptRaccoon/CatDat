import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_ADMIN_URL: {
		public: true,
		static: true,
		description: 'URL of admin application that tracks visits etc.'
	}
})
