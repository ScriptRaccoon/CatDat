import { db_visits } from '$lib/server/db'
import { error } from '@sveltejs/kit'

export const prerender = false

const COUNTRY_COUNT_THRESHOLD = 10

export const load = async () => {
	try {
		const results = await db_visits.batch([
			`SELECT
				COALESCE(MIN(created_at), '') AS start,
				COUNT(*) AS total,
				COUNT(CASE WHEN created_at >= datetime('now', '-1 day') THEN 1 END) AS total_last_day,
				COUNT(CASE WHEN created_at >= datetime('now', '-7 days') THEN 1 END) AS total_last_week,
				COUNT(CASE WHEN created_at >= datetime('now', '-1 month') THEN 1 END) AS total_last_month
			FROM visits`,
			`SELECT
    			date(created_at) AS day,
    			COUNT(*) AS count
			FROM visits
			GROUP BY day
			ORDER BY day`,
			`SELECT
                country,
                COUNT(*) as count
            FROM visits
            GROUP BY country
            ORDER BY count DESC`,
			`SELECT
                theme,
                COUNT(*) as count
            FROM visits
            GROUP BY theme
            ORDER BY theme`,
			`SELECT
                device_type,
                COUNT(*) as count
            FROM visits
            GROUP BY device_type
            ORDER BY count DESC`,
		])

		const summary = results[0].rows[0] as unknown as {
			start: string
			total: number
			total_last_day: number
			total_last_week: number
			total_last_month: number
		}

		const { start, total, total_last_day, total_last_week, total_last_month } =
			summary

		const daily_visits = results[1].rows as unknown as {
			day: string
			count: number
		}[]

		const detailed_country_stats = results[2].rows as unknown as {
			country: string
			count: number
		}[]

		const theme_stats = results[3].rows as unknown as {
			theme: string
			count: number
		}[]

		const device_stats = results[4].rows as unknown as {
			device_type: string
			count: number
		}[]

		const country_stats: typeof detailed_country_stats = []
		let other_count = 0

		for (const { country, count } of detailed_country_stats) {
			if (count <= COUNTRY_COUNT_THRESHOLD) other_count += count
			else country_stats.push({ country, count })
		}

		country_stats.push({ country: 'Others', count: other_count })

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
	} catch (err) {
		console.error(err)
		error(500, 'Failed to load data')
	}
}
