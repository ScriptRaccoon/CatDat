import { ADMIN_PAGE_PASSWORD } from '$env/static/private'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { create_session } from '../sessions'

export const prerender = false

export const actions: Actions = {
	login: async (event) => {
		const form = await event.request.formData()
		const password = form.get('password')

		if (!password) {
			return fail(400, { error: 'Password required' })
		}
		if (password !== ADMIN_PAGE_PASSWORD) {
			return fail(400, { error: 'Password incorrect' })
		}

		create_session(event)

		redirect(303, '/admin')
	},
}
