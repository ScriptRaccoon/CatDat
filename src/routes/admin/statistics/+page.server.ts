import { batch_visits } from '$lib/server/db.visits'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import { has_session } from '../sessions'
import { redirect } from '@sveltejs/kit'

export const prerender = false

export const load = async (event) => {
	if (!has_session(event)) redirect(307, '/admin/login')

	const { err, results } = await batch_visits<
		[
			{
				start: string
				total: number
				total_last_day: number
				total_last_week: number
				total_last_month: number
			},
			{
				day: string
				count: number
			},
			{
				country: string | null
				count: number
			},
			{
				theme: string
				count: number
				percentage: number
			},
			{
				device_type: string
				count: number
				percentage: number
			},
		]
	>([
		sql`SELECT
				COALESCE(MIN(created_at), '') AS start,
				COUNT(*) AS total,
				COUNT(CASE WHEN created_at >= datetime('now', '-1 day') THEN 1 END) AS total_last_day,
				COUNT(CASE WHEN created_at >= datetime('now', '-7 days') THEN 1 END) AS total_last_week,
				COUNT(CASE WHEN created_at >= datetime('now', '-1 month') THEN 1 END) AS total_last_month
			FROM visits`,
		sql`SELECT
    			date(created_at) AS day,
    			COUNT(*) AS count
			FROM visits
			WHERE created_at >= datetime('now', '-14 days')
			GROUP BY day
			ORDER BY day DESC
			`,
		sql`SELECT
                country,
                COUNT(*) as count
            FROM visits
            GROUP BY country
            ORDER BY count DESC
			LIMIT 10
			`,
		sql`SELECT
                theme,
                COUNT(*) as count,
				 ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
            FROM visits
            GROUP BY theme
            ORDER BY theme`,
		sql`SELECT
                device_type,
                COUNT(*) as count,
				ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
            FROM visits
            GROUP BY device_type
            ORDER BY count DESC`,
	])

	if (err) {
		error(500, 'Failed to load statistics')
	}

	const [
		[{ start, total, total_last_day, total_last_week, total_last_month }],
		daily_visits,
		country_stats,
		theme_stats,
		device_stats,
	] = results

	return {
		start,
		total,
		total_last_day,
		total_last_week,
		total_last_month,
		daily_visits,
		country_stats,
		theme_stats,
		device_stats,
	}
}
