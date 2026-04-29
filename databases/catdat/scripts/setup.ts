import fs from 'node:fs'
import path from 'node:path'
import { get_client } from './shared'

setup()

/**
 * Creates the tables, indexes, triggers, and views.
 */
function setup() {
	console.info('\n--- Setup CatDat database ---')

	const db = get_client()
	db.exec('PRAGMA foreign_keys = ON')

	const schema_folder = path.join(process.cwd(), 'databases', 'catdat', 'schema')

	const unsorted_files = fs.readdirSync(schema_folder, 'utf8')
	const files = unsorted_files.filter((f) => f.endsWith('.sql')).sort()

	const invalid_file = files.find((file) => !file.match(/^\d{3}_/))
	if (invalid_file) throw new Error(`Invalid file name: ${invalid_file}`)

	for (const file of files) {
		const sql = fs.readFileSync(path.join(schema_folder, file), 'utf8')

		const process_file = db.transaction(() => {
			console.info(`Apply: ${file}`)
			db.exec(sql)
		})

		try {
			process_file()
		} catch (err) {
			console.error(`Failed to apply file: ${file}`, err)
			process.exit(1)
		}
	}

	console.info('Setup complete')
}
