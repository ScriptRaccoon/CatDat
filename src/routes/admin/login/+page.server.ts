import { ADMIN_PAGE_PASSWORD } from '$env/static/private'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { create_session } from '../sessions'
import { redis } from '$lib/server/redis'

export const prerender = false

export const actions: Actions = {
	login: async (event) => {
		const ip = event.getClientAddress()
		const key = `rate_limit_admin_login:ip:${ip}`
		const count = Number((await redis.get(key)) ?? 0)

		if (count >= 5) {
			return fail(429, {
				error: 'Too many login attempts. Please try again later.',
			})
		}

		const form = await event.request.formData()
		const password = form.get('password')

		if (!password || typeof password !== 'string') {
			return fail(400, { error: 'Password required' })
		}

		if (password !== ADMIN_PAGE_PASSWORD) {
			const next = await redis.incr(key)
			if (next === 1) await redis.expire(key, 60 * 10)

			return fail(400, { error: 'Password incorrect' })
		}

		create_session(event)

		await redis.del(key)

		redirect(303, '/admin')
	},
}
