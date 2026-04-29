import fs from 'node:fs'
import path from 'node:path'
import { get_client } from './shared'

/**
 * Seeds the data recorded in SQL files into the database.
 */
async function seed() {
	console.info('\n--- Seed CatDat database ---')
	const db = get_client()
	const data_folder = path.join(process.cwd(), 'databases', 'catdat', 'data')

	const subfolders = fs
		.readdirSync(data_folder, { withFileTypes: true })
		.filter((f) => f.isDirectory())
		.map((f) => f.name)
		.sort()

	const invalid_folder = subfolders.find((f) => !f.match(/^\d{3}_/))
	if (invalid_folder) throw new Error(`Invalid folder name: ${invalid_folder}`)

	const process_files = db.transaction(() => {
		for (const folder of subfolders) {
			const folder_path = path.join(data_folder, folder)
			const files = fs
				.readdirSync(folder_path, { withFileTypes: true })
				.filter((f) => f.isFile() && f.name.endsWith('.sql'))
				.map((f) => path.join(folder_path, f.name))
				.sort()

			for (const file of files) {
				const base = path.basename(file)
				const is_valid = base?.match(/^[A-Za-z0-9_.,\-()]+$/)
				if (!is_valid) {
					throw new Error(`Invalid file name: ${base}`)
				}

				console.info(`Seed: ${base}`)

				try {
					const sql = fs.readFileSync(file, 'utf8')
					db.exec(sql)
				} catch (err) {
					throw new Error(`Seed failed in ${base}: ${String(err)}`)
				}
			}
		}
	})

	try {
		process_files()
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}

await seed()
