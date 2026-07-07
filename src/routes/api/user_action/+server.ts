import { query_app } from '$lib/server/db.app'
import { is_object } from '$shared/utils'
import sql from 'sql-template-tag'
import { is_allowed } from '../track/track.utils'
import { json } from '@sveltejs/kit'

type ValidBody = { action: string; value?: string }

const is_valid_body = (body: unknown): body is ValidBody =>
	is_object(body) &&
	'action' in body &&
	typeof body.action === 'string' &&
	(!('value' in body) || typeof body.value === 'string')

export const POST = async (event) => {
	if (!is_allowed(event)) return json({ error: 'Forbidden' }, { status: 403 })

	if (event.request.headers.get('Content-Type') !== 'application/json') {
		return json({ error: 'Invalid Request' }, { status: 400 })
	}

	const body: unknown = await event.request.json()

	if (!is_valid_body(body)) {
		return json({ error: 'Invalid Request Body' }, { status: 400 })
	}

	const { action, value = null } = body

	const { err } = await query_app(
		sql`INSERT INTO user_actions (action, value) VALUES (${action}, ${value})`
	)

	if (err) return json({ error: 'Database error' }, { status: 500 })

	return json({ message: 'User action has been recorded' })
}
