import Database from 'better-sqlite3'
import path from 'node:path'

const db_path = path.resolve('databases', 'catdat', 'catdat.db')

export function get_client(options: { readonly: boolean }) {
	const db = new Database(db_path, options)
	db.pragma('foreign_keys = ON')
	return db
}
