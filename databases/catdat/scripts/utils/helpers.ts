import Database, { type Database as DatabaseType } from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'
import YAML from 'yaml'

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

function read_yaml_file<T>(...parts: string[]): T {
	const content = fs.readFileSync(path.join(...parts), 'utf8')
	return YAML.parse(content) as T
}

function get_yaml_files(folder: string) {
	return fs
		.readdirSync(folder)
		.filter((file) => file.endsWith('.yaml'))
		.sort()
}

export function seed_file<T>(
	db: DatabaseType,
	label: string,
	file: string,
	insert: (item: T) => void,
) {
	console.info(`\nSeed ${label} ...`)
	const item = read_yaml_file<T>(file)

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')
		insert(item)
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding ${label}:`, err)
		process.exit(1)
	}
}

export function seed_files<T>(
	db: DatabaseType,
	label: string,
	folder: string,
	insert: (item: T) => void,
) {
	console.info(`\nSeed ${label} ...`)

	const files = get_yaml_files(folder)

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		for (const file of files) {
			console.info(`Seed: ${file}`)

			const item = read_yaml_file<T>(folder, file)
			insert(item)
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding ${label}:`, err)
		process.exit(1)
	}
}
