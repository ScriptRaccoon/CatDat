import type { Arrayed } from '$lib/commons/types'
import { type SqliteError } from 'better-sqlite3'

import { get_client } from '$shared/db'

/**
 * Database client for the CatDat database holding all mathematical knowledge
 */
export const db = get_client({ readonly: true })

/**
 * Small wrapper around db.prepare.all to handle errors,
 * use sql templates, and specify the type of the result.
 * @deprecated
 */
export function query<T>({ sql, values = [] }: { sql: string; values?: any[] }) {
	try {
		const rows = db.prepare<unknown[], T>(sql).all(...values)
		return { rows, err: null }
	} catch (err) {
		console.error(err)
		return { rows: null, err: err as SqliteError }
	}
}

/**
 * Small wrapper around db.transaction to handle errors
 * use sql templates, and specify the type of the result.
 * @deprecated
 */
export function batch<T extends any[]>(queries: { sql: string; values?: any[] }[]) {
	try {
		const run_batch = db.transaction(() => {
			const results = []

			for (const { sql, values = [] } of queries) {
				const result = db.prepare(sql).all(...values)
				results.push(result)
			}

			return results
		})

		const results = run_batch() as Arrayed<T>
		return { results, err: null }
	} catch (err) {
		console.error(err)
		return { rows: null, err: err as SqliteError }
	}
}
