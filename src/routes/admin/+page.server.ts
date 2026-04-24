import { redirect } from '@sveltejs/kit'
import { has_session } from './sessions'

export const prerender = false

export const load = async (event) => {
	if (!has_session(event)) redirect(307, '/admin/login')
}
