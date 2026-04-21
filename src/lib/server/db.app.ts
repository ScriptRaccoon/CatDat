import { createClient, type LibsqlError } from '@libsql/client'
import type { Arrayed } from '$lib/commons/types'
import { APP_DB_AUTH_TOKEN, APP_DB_URL } from '$env/static/private'

const db_visits = createClient({
	url: APP_DB_URL,
	authToken: APP_DB_AUTH_TOKEN,
})

db_visits.execute('PRAGMA foreign_keys = ON')

/**
 * Small wrapper around db.execute to handle errors,
 * use sql templates, and specify the type of the result.
 */
export async function query_app<T>(stmt: { sql: string; values: any[] }) {
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
export async function batch_app<T extends any[]>(
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
