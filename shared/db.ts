import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'

const db_path = path.resolve('database', 'catdat.db')

export function get_client(options: { readonly: boolean }) {
	const db = new Database(db_path, options)
	db.pragma('foreign_keys = ON')
	return db
}

export function delete_database_file() {
	fs.rmSync(db_path, { force: true })
}
