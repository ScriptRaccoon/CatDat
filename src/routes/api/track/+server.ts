import { is_object } from '$lib/server/utils'
import { json } from '@sveltejs/kit'
import { get_geo_data, is_allowed } from './track.utils'
import { db_visits } from '$lib/server/db'

type ValidBody = { device_type: string; theme: string }

const is_valid_body = (body: unknown): body is ValidBody =>
	is_object(body) &&
	'device_type' in body &&
	typeof body.device_type === 'string' &&
	'theme' in body &&
	typeof body.theme === 'string'

export const POST = async (event) => {
	if (!is_allowed(event)) return json({ error: 'Forbidden' }, { status: 403 })

	if (event.request.headers.get('Content-Type') !== 'application/json') {
		return json({ error: 'Invalid Request' }, { status: 400 })
	}

	const body: unknown = await event.request.json()

	if (!is_valid_body(body)) {
		return json({ error: 'Invalid Request Body' }, { status: 400 })
	}

	const { device_type, theme } = body

	const { country } = get_geo_data(event.request)

	try {
		await db_visits.execute(
			`INSERT INTO visits (theme, device_type, country) VALUES (?, ?, ?)`,
			[theme, device_type, country],
		)
	} catch (err) {
		console.error(err)
		return json({ error: 'Database error' }, { status: 500 })
	}

	return json({ message: 'Visit has been tracked' })
}
