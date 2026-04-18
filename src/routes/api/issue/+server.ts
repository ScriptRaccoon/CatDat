import { json } from '@sveltejs/kit'
// import { App } from '@octokit/app'
// import { GITHUB_PRIVATE_KEY } from '$env/static/private'

// import {
// 	BODY_MAX_LENGTH,
// 	GITHUB_APP_ID,
// 	GITHUB_INSTALLATION_ID,
// 	GITHUB_OWNER,
// 	GITHUB_REPO,
// 	TITLE_MAX_LENGTH,
// 	NAME_MAX_LENGTH,
// } from './config'
// import { flag_violation, is_blocked, has_profanity, rate_limit } from '$lib/server/redis'
// import { error } from 'node:console'

// const app = new App({
// 	appId: GITHUB_APP_ID,
// 	privateKey: GITHUB_PRIVATE_KEY,
// })

export const POST = async (event) => {
	return json({ error: 'Not implemented' }, { status: 501 })
	// const ip = event.getClientAddress()

	// if (await is_blocked(ip)) {
	// 	return json({ error: 'Forbidden' }, { status: 403 })
	// }

	// if (!(await rate_limit(ip))) {
	// 	await flag_violation(ip, 'rate_limit')
	// 	return json(
	// 		{ error: 'Too many requests. Please try again later.' },
	// 		{ status: 429 },
	// 	)
	// }

	// const data = await parse_data(event.request)

	// if ('error' in data) return json({ error: data.error }, { status: 400 })

	// const { title, body, url, name } = data

	// if (has_profanity(title, body)) {
	// 	await flag_violation(ip, 'profanity')
	// 	return json({ error: 'Profanity detected' }, { status: 400 })
	// }

	// const footer = name
	// 	? `This issue has been created by **${name}** via the submission form on ${url}`
	// 	: `This issue has been created via the submission form on ${url}`

	// const full_body = `${body}\n\n---\n${footer}`

	// try {
	// 	const octokit = await app.getInstallationOctokit(Number(GITHUB_INSTALLATION_ID))

	// 	const issue = await octokit.request('POST /repos/{owner}/{repo}/issues', {
	// 		owner: GITHUB_OWNER,
	// 		repo: GITHUB_REPO,
	// 		title,
	// 		body: full_body,
	// 	})

	// 	return json({ url: issue.data.html_url })
	// } catch (err) {
	// 	console.error(err)
	// 	return json({ error: 'Issue could not be created' }, { status: 502 })
	// }
}

// async function parse_data(
// 	request: Request,
// ): Promise<
// 	{ error: string } | { title: string; body: string; url: string; name: string }
// > {
// 	const content_type = request.headers.get('Content-Type')
// 	if (content_type !== 'application/json') {
// 		return { error: 'Forbidden' }
// 	}

// 	let data
// 	try {
// 		data = await request.json()
// 	} catch (_) {
// 		return { error: 'Invalid request body' }
// 	}

// 	const { title, body, url, name = '' } = data

// 	if (!title) return { error: 'Title required' }
// 	if (!body) return { error: 'Body required' }
// 	if (!url) return { error: 'URL required' }

// 	if (typeof title !== 'string') return { error: 'Title must be a string' }
// 	if (typeof body !== 'string') return { error: 'Body must be a string' }
// 	if (typeof url !== 'string') return { error: 'URL must be a string' }
// 	if (typeof name !== 'string') return { error: 'Name must be a string' }

// 	if (title.length > TITLE_MAX_LENGTH) {
// 		return { error: `Title must have at most ${TITLE_MAX_LENGTH} characters` }
// 	}
// 	if (body.length > BODY_MAX_LENGTH) {
// 		return { error: `Body must have at most ${BODY_MAX_LENGTH} characters` }
// 	}

// 	if (!url.startsWith('https://') && !url.startsWith('http://')) {
// 		return { error: 'URL must be a valid URL' }
// 	}

// 	if (name.length > NAME_MAX_LENGTH) {
// 		return { error: `Name must have at most ${NAME_MAX_LENGTH} characters` }
// 	}

// 	return { title, body, url, name }
// }
