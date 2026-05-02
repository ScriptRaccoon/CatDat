import type { Arrayed } from '$lib/commons/types'
import Database, { SqliteError } from 'better-sqlite3'
import { join } from 'node:path'

const db_path = join(process.cwd(), 'databases', 'catdat', 'catdat.db')

/**
 * Database client for the CatDat database holding all mathematical knowledge
 */
const db = new Database(db_path, { readonly: true, fileMustExist: true })

/**
 * Small wrapper around db.prepare.all to handle errors,
 * use sql templates, and specify the type of the result.
 */
export function query<T>(stmt: { sql: string; values: any[] }) {
	try {
		const rows = db.prepare(stmt.sql).all(...stmt.values)
		return { rows: rows as T[], err: null }
	} catch (err) {
		console.error(err)
		return { rows: null, err: err as SqliteError }
	}
}

/**
 * Small wrapper around db.transaction to handle errors
 * use sql templates, and specify the type of the result.
 */
export function batch<T extends any[]>(queries: { sql: string; values: any[] }[]) {
	try {
		const run_batch = db.transaction(() => {
			const results = []

			for (const query of queries) {
				const result = db.prepare(query.sql).all(...query.values)
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
