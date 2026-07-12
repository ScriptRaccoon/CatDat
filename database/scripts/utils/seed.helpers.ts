import type { Database } from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'
import YAML from 'yaml'
import { devlog } from '$shared/utils'

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
	db: Database,
	label: string,
	file: string,
	insert: (item: T) => void
) {
	devlog(`\nSeed ${label} ...`)
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
	db: Database,
	label: string,
	folder: string,
	insert: (item: T) => void
) {
	devlog(`\nSeed ${label} ...`)

	const files = get_yaml_files(folder)

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		for (const file of files) {
			devlog(`Seed: ${file}`)

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
