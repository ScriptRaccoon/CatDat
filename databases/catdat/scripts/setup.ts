import fs from 'node:fs'
import path from 'node:path'
import { get_client } from './shared'
import { create_schema_hash, write_schema_hash } from './schema.utils'

const schema_folder = path.join(process.cwd(), 'databases', 'catdat', 'schema')

setup()

/**
 * Creates the tables, indexes, triggers, and views.
 */
function setup() {
	console.info('\n--- Setup CatDat database ---')

	const db = get_client()
	db.pragma('foreign_keys = ON')

	const files = fs
		.readdirSync(schema_folder, 'utf8')
		.filter((file) => file.endsWith('.sql'))
		.sort()

	const invalid_file = files.find((file) => !file.match(/^\d{3}_/))
	if (invalid_file) throw new Error(`Invalid file name: ${invalid_file}`)

	for (const file of files) {
		const sql = fs.readFileSync(path.join(schema_folder, file), 'utf8')

		console.info(`Apply: ${file}`)

		try {
			db.exec(sql)
		} catch (err) {
			console.error(`Failed to apply file: ${file}`, String(err))
			process.exit(1)
		}
	}

	const hash = create_schema_hash()
	write_schema_hash(hash)

	console.info('Setup complete')
}
