import { error, fail, redirect } from '@sveltejs/kit'
import { has_session } from '../sessions'
import { query_visits } from '$lib/server/db.visits'
import sql from 'sql-template-tag'

export const prerender = false

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

		const { err } = await query_visits(
			sql`
				UPDATE submissions
				SET approved_at = CURRENT_TIMESTAMP
				WHERE id = ${submission_id}
			`,
		)

		if (err) return fail(500, { error: 'Failed to approve submission' })

		// TODO: create GitHub issue here
	},
}
