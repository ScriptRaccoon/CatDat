import { error, redirect } from '@sveltejs/kit'
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
