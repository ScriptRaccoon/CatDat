import { json } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import { redis } from '$lib/server/redis'
import { send_email } from '$lib/server/email'
import { APPROVAL_EMAIL } from '$env/static/private'
import { query_app } from '$lib/server/db.app'

const TITLE_MAX_LENGTH = 50
const BODY_MAX_LENGTH = 10000
const NAME_MAX_LENGTH = 50

export const POST = async (event) => {
	const ip = event.getClientAddress()
	const key = `rate_limit_submissions:ip:${ip}`
	const count = await redis.incr(key)
	if (count === 1) await redis.expire(key, 60 * 30)

	if (count > 5) {
		return json(
			{ error: 'Too many submissions. Please try again later.' },
			{ status: 429 },
		)
	}

	const data = await parse_data(event.request)

	if ('error' in data) return json({ error: data.error }, { status: 400 })

	const { title, body, url, name } = data

	const { err } = await query_app(sql`
		INSERT INTO submissions (title, body, url, name)
		VALUES (${title}, ${body}, ${url}, ${name})	
	`)

	if (err) {
		return json({ error: 'Internal Server Error' }, { status: 500 })
	}

	const approve_url = `${event.url.origin}/admin/submissions`

	const email_text =
		`The suggestion form has been submitted.\n\n` +
		`Title: ${title}\n\n` +
		`Approve it here: ${approve_url}`

	try {
		await send_email({
			subject: 'CatDat – New submission',
			text: email_text,
			to: APPROVAL_EMAIL,
		})
	} catch (err) {
		console.error(err)
	}

	return json({ message: 'Submission successful' })
}

async function parse_data(request: Request): Promise<
	| { error: string }
	| {
			title: string
			body: string
			url: string
			name: string | null
	  }
> {
	const content_type = request.headers.get('Content-Type')
	if (content_type !== 'application/json') {
		return { error: 'Forbidden' }
	}

	let data
	try {
		data = await request.json()
	} catch (_) {
		return { error: 'Invalid request body' }
	}

	const { title, body, url, name = '' } = data

	if (!title) return { error: 'Title required' }
	if (!body) return { error: 'Body required' }
	if (!url) return { error: 'URL required' }

	if (typeof title !== 'string') return { error: 'Title must be a string' }
	if (typeof body !== 'string') return { error: 'Body must be a string' }
	if (typeof url !== 'string') return { error: 'URL must be a string' }
	if (typeof name !== 'string') return { error: 'Name must be a string' }

	if (title.length > TITLE_MAX_LENGTH) {
		return { error: `Title must have at most ${TITLE_MAX_LENGTH} characters` }
	}
	if (body.length > BODY_MAX_LENGTH) {
		return { error: `Body must have at most ${BODY_MAX_LENGTH} characters` }
	}

	if (!url.startsWith('https://') && !url.startsWith('http://')) {
		return { error: 'URL must be a valid URL' }
	}

	if (name.length > NAME_MAX_LENGTH) {
		return { error: `Name must have at most ${NAME_MAX_LENGTH} characters` }
	}

	return { title, body, url, name: name || null }
}
