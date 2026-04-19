import { DB_VISITS_AUTH_TOKEN, DB_VISITS_URL } from '$env/static/private'
import { createClient, type LibsqlError } from '@libsql/client'
import type { Arrayed } from '$lib/commons/types'

const db_visits = createClient({
	url: DB_VISITS_URL,
	authToken: DB_VISITS_AUTH_TOKEN,
})

db_visits.execute('PRAGMA foreign_keys = ON')

/**
 * Small wrapper around db.execute to handle errors,
 * use sql templates, and specify the type of the result.
 */
export async function query_visits<T>(stmt: { sql: string; values: any[] }) {
	try {
		const { rows } = await db_visits.execute(stmt.sql, stmt.values)
		return { rows: rows as T[], err: null }
	} catch (err) {
		console.error(err)
		return { rows: null, err: err as LibsqlError }
	}
}

/**
 * Small wrapper around db.batch to handle errors
 * use sql templates, and specify the type of the result.
 */
export async function batch_visits<T extends any[]>(
	queries: { sql: string; values: any[] }[],
) {
	try {
		const results = await db_visits.batch(
			queries.map((query) => ({
				sql: query.sql,
				args: query.values,
			})),
		)
		return { results: results.map(({ rows }) => rows) as Arrayed<T>, err: null }
	} catch (err) {
		console.error(err)
		return { results: null, err: err as LibsqlError }
	}
}
