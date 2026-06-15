import Database from 'better-sqlite3'
import path from 'node:path'

export function get_client() {
	const db_path = path.resolve('databases', 'catdat', 'catdat.db')
	const db = new Database(db_path, { readonly: false })
	db.pragma('foreign_keys = ON')
	return db
}
