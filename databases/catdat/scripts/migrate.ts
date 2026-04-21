import { type Client } from '@libsql/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import dotenv from 'dotenv'
import { get_client } from './shared'

dotenv.config({ quiet: true })

await migrate()

/**
 * Creates the tables, indexes, triggers, and views.
 */
async function migrate() {
	const db = get_client()
	await db.execute('PRAGMA foreign_keys = ON')
	await create_migrations_table(db)
	await apply_migrations(db)
}

/**
 * Creates the migration table that records
 * which migrations have already been applied.
 */
async function create_migrations_table(db: Client) {
	await db.execute(`
		CREATE TABLE IF NOT EXISTS migrations (
			file TEXT PRIMARY KEY,
			applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
		)
	`)
}

/**
 * Applies all migrations that have not been applied yet.
 */
async function apply_migrations(db: Client) {
	const { rows } = await db.execute('SELECT file FROM migrations')
	const applied_migrations = new Set<string>(rows.map((row) => row.file) as string[])

	const migrations_folder = path.join(
		process.cwd(),
		'databases',
		'catdat',
		'migrations',
	)
	const unsorted_files = await fs.readdir(migrations_folder, 'utf8')
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

		const sql = await fs.readFile(path.join(migrations_folder, file), 'utf8')

		const tx = await db.transaction()
		try {
			await tx.executeMultiple(sql)
			await tx.execute({
				sql: 'INSERT INTO migrations (file) VALUES (?)',
				args: [file],
			})
			await tx.commit()
			console.info(`Applied migration: ${file}`)
		} catch (err) {
			console.error(`Failed migration: ${file}`, err)
			await tx.rollback()
			process.exit(1)
		}
	}

	console.info('Applied all migrations')
}
