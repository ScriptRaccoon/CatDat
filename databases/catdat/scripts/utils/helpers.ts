import Database from 'better-sqlite3'
import path from 'node:path'

export function are_equal_sets<T>(a: Set<T>, b: Set<T>) {
	return a.size === b.size && [...a].every((el) => b.has(el))
}

export function is_subset<T>(a: Set<T>, b: Set<T>, options?: { exception: T }) {
	for (const x of a) {
		if (x !== options?.exception && !b.has(x)) return false
	}
	return true
}

export function capitalize(txt: string) {
	return txt[0].toUpperCase() + txt.slice(1)
}

export function parse_json_set<T>(json: string): Set<T> {
	return new Set(JSON.parse(json))
}

export function get_client() {
	const db_path = path.resolve('databases', 'catdat', 'catdat.db')
	const db = new Database(db_path, { readonly: false })
	db.pragma('foreign_keys = ON')
	return db
}
