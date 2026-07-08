import { createClient, type LibsqlError } from '@libsql/client'
import type { Arrayed } from '$lib/commons/types'
import { APP_DB_AUTH_TOKEN, APP_DB_URL } from '$env/static/private'

/**
 * Database client used only for the CatDat web application,
 * in particular for user submissions and page visits.
 */
const db_app = createClient({
	url: APP_DB_URL,
	authToken: APP_DB_AUTH_TOKEN
})

db_app.execute('PRAGMA foreign_keys = ON')

/**
 * Small wrapper around db.execute to handle errors,
 * use sql templates, and specify the type of the result.
 */
export async function query_app<T>({
	sql,
	values = []
}: {
	sql: string
	values?: any[]
}) {
	try {
		const { rows } = await db_app.execute(sql, values)
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
	queries: { sql: string; values?: any[] }[]
) {
	try {
		const results = await db_app.batch(
			queries.map(({ sql, values = [] }) => ({ sql, args: values ?? [] }))
		)
		return {
			results: results.map(({ rows }) => rows) as Arrayed<T>,
			err: null
		}
	} catch (err) {
		console.error(err)
		return { results: null, err: err as LibsqlError }
	}
}
