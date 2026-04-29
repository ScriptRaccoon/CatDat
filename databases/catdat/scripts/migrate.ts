import fs from 'node:fs'
import path from 'node:path'
import { get_client } from './shared'
import { type Database } from 'better-sqlite3'

migrate()

/**
 * Creates the tables, indexes, triggers, and views.
 */
function migrate() {
	console.info('\n--- Migrate CatDat database ---')
	const db = get_client()
	db.exec('PRAGMA foreign_keys = ON')
	create_migrations_table(db)
	apply_migrations(db)
}

/**
 * Creates the migration table that records
 * which migrations have already been applied.
 */
function create_migrations_table(db: Database) {
	db.exec(`
		CREATE TABLE IF NOT EXISTS migrations (
			file TEXT PRIMARY KEY,
			applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
		)
	`)
}

/**
 * Applies all migrations that have not been applied yet.
 */
function apply_migrations(db: Database) {
	const rows = db.prepare('SELECT file FROM migrations').all() as { file: string }[]
	const applied_migrations = new Set<string>(rows.map((row) => row.file) as string[])

	const migrations_folder = path.join(
		process.cwd(),
		'databases',
		'catdat',
		'migrations',
	)
	const unsorted_files = fs.readdirSync(migrations_folder, 'utf8')
	const files = unsorted_files.filter((f) => f.endsWith('.sql')).sort()

	const invalid_file = files.find((file) => !file.match(/^\d{3}_/))
	if (invalid_file) throw new Error(`Invalid file name: ${invalid_file}`)

	const all_done = files.every((file) => applied_migrations.has(file))

	if (all_done) {
		console.info('No migrations need to be applied')
		process.exit(0)
	}

	for (const file of files) {
		if (applied_migrations.has(file)) continue

		const sql = fs.readFileSync(path.join(migrations_folder, file), 'utf8')

		const process_file = db.transaction(() => {
			db.exec(sql)
			db.prepare('INSERT INTO migrations (file) VALUES (?)').run(file)
			console.info(`Applied migration: ${file}`)
		})

		try {
			process_file()
		} catch (err) {
			console.error(`Failed migration: ${file}`, err)
			process.exit(1)
		}
	}

	console.info('Applied all migrations')
}
