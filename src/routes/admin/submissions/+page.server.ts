import { error, fail, redirect } from '@sveltejs/kit'
import { has_session } from '../sessions'
import { query_visits } from '$lib/server/db.visits'
import sql from 'sql-template-tag'
import { App } from '@octokit/app'
import { GITHUB_PRIVATE_KEY } from '$env/static/private'

export const prerender = false

const GITHUB_APP_ID = '3330448'
const GITHUB_INSTALLATION_ID = '122747163'
const GITHUB_OWNER = 'ScriptRaccoon'
const GITHUB_REPO = 'CatDat'

export const load = async (event) => {
	if (!has_session(event)) redirect(307, '/admin/login')

	const { rows: submissions, err } = await query_visits<{
		id: number
		title: string
		body: string
		url: string
		name: string | null
		created_at: string
		approved_at: string | null
	}>(sql`
		SELECT id, title, body, url, name, created_at, approved_at
		FROM submissions
		ORDER BY created_at DESC	
	`)

	if (err) {
		error(500, 'Could not load submissions')
	}

	return { submissions }
}

export const actions = {
	delete: async (event) => {
		if (!has_session(event)) redirect(307, '/admin/login')

		const form = await event.request.formData()
		const submission_id = form.get('id')
		if (!submission_id) return fail(400, { error: 'Submission ID required' })

		const { err } = await query_visits(
			sql`DELETE FROM submissions WHERE id = ${submission_id}`,
		)

		if (err) return fail(500, { error: 'Failed to delete submission' })
	},

	approve: async (event) => {
		if (!has_session(event)) redirect(307, '/admin/login')

		const form = await event.request.formData()
		const submission_id = form.get('id')
		if (!submission_id) return fail(400, { error: 'Submission ID required' })

		const { rows, err } = await query_visits<{
			title: string
			body: string
			name: string | null
			url: string
		}>(
			sql`
				UPDATE submissions
				SET approved_at = CURRENT_TIMESTAMP
				WHERE id = ${submission_id}
				RETURNING title, body, name, url
			`,
		)

		if (err) return fail(500, { error: 'Failed to approve submission' })

		const { title, body, name, url } = rows[0]

		const app = new App({
			appId: GITHUB_APP_ID,
			privateKey: GITHUB_PRIVATE_KEY,
		})

		const footer = name
			? `This issue has been created by **${name}** via the submission form on ${url}`
			: `This issue has been created via the submission form on ${url}`

		const full_body = `${body}\n\n---\n${footer}`

		try {
			const octokit = await app.getInstallationOctokit(
				Number(GITHUB_INSTALLATION_ID),
			)

			const issue = await octokit.request('POST /repos/{owner}/{repo}/issues', {
				owner: GITHUB_OWNER,
				repo: GITHUB_REPO,
				title,
				body: full_body,
			})

			return { issue_url: issue.data.html_url }
		} catch (err) {
			console.error(err)
			return fail(502, { error: 'Issue could not be created' })
		}
	},
}
