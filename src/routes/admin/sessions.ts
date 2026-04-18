import crypto from 'node:crypto'
import type { RequestEvent } from '@sveltejs/kit'

const sessions = new Set<string>()

const ADMIN_SESSION_COOKIE_NAME = 'admin_session_id'

export function create_session(event: RequestEvent) {
	const session_id = crypto.randomUUID()
	sessions.add(session_id)

	event.cookies.set(ADMIN_SESSION_COOKIE_NAME, session_id, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 60,
	})
}

export function has_session(event: RequestEvent) {
	const session_id = event.cookies.get(ADMIN_SESSION_COOKIE_NAME)
	return !!session_id && sessions.has(session_id)
}
