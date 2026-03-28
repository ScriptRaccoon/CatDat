import { createClient } from '@libsql/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const DB_URL = process.env.DB_URL
const DB_AUTH_TOKEN = process.env.DB_AUTH_TOKEN

if (!DB_URL) throw new Error('No DB_URL found')

const db = createClient({
	url: DB_URL,
	authToken: DB_AUTH_TOKEN,
})

const data_folder = path.join(process.cwd(), 'database', 'data')

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
		const sql = await fs.readFile(file, 'utf8')
		const tx = await db.transaction()
		try {
			await tx.executeMultiple(sql)
			await tx.commit()
			const operation = file.includes('clear') ? 'Clear data' : 'Insert data'
			console.info(`${operation}: ${base}`)
		} catch (err) {
			console.error(`Failed to process ${file}`, err)
			await tx.rollback()
			process.exit(1)
		}
	}
}

console.info('Inserted all data')
