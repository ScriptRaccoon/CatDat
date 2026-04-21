import fs from 'node:fs/promises'
import path from 'node:path'
import { get_client } from './shared'

/**
 * Seeds the data recorded in SQL files into the database.
 */
async function seed() {
	const db = get_client()
	const data_folder = path.join(process.cwd(), 'databases', 'catdat', 'data')

	const subfolders = (await fs.readdir(data_folder, { withFileTypes: true }))
		.filter((f) => f.isDirectory())
		.map((f) => f.name)
		.sort()

	const invalid_folder = subfolders.find((f) => !f.match(/^\d{3}_/))
	if (invalid_folder) throw new Error(`Invalid folder name: ${invalid_folder}`)

	for (const folder of subfolders) {
		const folder_path = path.join(data_folder, folder)
		const files = (await fs.readdir(folder_path, { withFileTypes: true }))
			.filter((f) => f.isFile() && f.name.endsWith('.sql'))
			.map((f) => path.join(folder_path, f.name))
			.sort()

		for (const file of files) {
			const base = path.basename(file)
			const is_valid = base?.match(/^[A-Za-z0-9_.,\-()]+$/)
			if (!is_valid) {
				throw new Error(`Invalid file name: ${base}`)
			}

			const tx = await db.transaction()
			try {
				const sql = await fs.readFile(file, 'utf8')

				await tx.executeMultiple(sql)
				await tx.commit()

				const operation = file.includes('clear') ? 'Clear data' : 'Insert data'
				console.info(`${operation}: ${base}`)
			} catch (err) {
				console.error(`Failed to seed ${file}`, err)
				await tx.rollback()
				process.exit(1)
			}
		}
	}

	console.info('Inserted all data')
}

await seed()
