import fs from 'node:fs'
import path from 'node:path'
import { delete_database_file, get_client } from '$shared/db'
import { create_schema_hash, write_schema_hash } from './utils/schema'
import { devlog } from '$shared/utils'

const schema_folder = path.resolve('database', 'schema')

setup()

/**
 * Creates the tables, indexes, triggers, and views in the database.
 */
function setup() {
	console.info('\n--- Setup CatDat database ---')

	delete_database_file()

	const db = get_client({ readonly: false })

	const files = fs
		.readdirSync(schema_folder, 'utf8')
		.filter((file) => file.endsWith('.sql'))
		.sort()

	const invalid_file = files.find((file) => !file.match(/^\d{3}_/))
	if (invalid_file) throw new Error(`Invalid file name: ${invalid_file}`)

	for (const file of files) {
		const sql = fs.readFileSync(path.join(schema_folder, file), 'utf8')

		devlog(`Apply: ${file}`)

		try {
			db.exec(sql)
		} catch (err) {
			console.error(`Failed to apply file: ${file}`, String(err))
			process.exit(1)
		}
	}

	const hash = create_schema_hash()
	write_schema_hash(hash)

	devlog('Setup complete')
}
