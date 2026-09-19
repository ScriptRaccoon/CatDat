import type { Database } from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'
import YAML from 'yaml'
import { devlog } from '$shared/utils'
import * as v from 'valibot'
import { structure_yaml_schema } from './seed.schemas'

function read_yaml_file(...parts: string[]) {
	const content = fs.readFileSync(path.join(...parts), 'utf8')
	return YAML.parse(content) as unknown
}

function get_yaml_files(folder: string) {
	return fs
		.readdirSync(folder)
		.filter((file) => file.endsWith('.yaml'))
		.sort()
}

export function seed_file<Schema extends v.GenericSchema>(
	db: Database,
	label: string,
	file: string,
	schema: Schema,
	insert: (item: v.InferOutput<Schema>) => void
) {
	devlog(`\nSeed ${label} ...`)
	const item = read_yaml_file(file)

	const { output, issues } = v.safeParse(schema, item)

	if (issues) {
		console.error(`❌ Contents of ${file} have invalid format`)
		issues.forEach((issue) => {
			const path = issue.path?.map((item) => item.key).join('.') ?? '<root>'
			console.error(`${path}: ${issue.message}`)
		})
		process.exit(1)
	}

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')
		insert(output)
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding ${label}:`, err)
		process.exit(1)
	}
}

export function seed_files<Schema extends v.GenericSchema>(
	db: Database,
	label: string,
	folder: string,
	schema: Schema,
	insert: (item: v.InferOutput<Schema>) => void
) {
	devlog(`\nSeed ${label} ...`)

	const files = get_yaml_files(folder)

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		for (const file of files) {
			devlog(`Seed: ${file}`)

			const item = read_yaml_file(folder, file)

			const { output, issues } = v.safeParse(schema, item)

			if (issues) {
				console.error(`❌ Contents of ${file} have invalid format`)
				issues.forEach((issue) => {
					const path = issue.path?.map((item) => item.key).join('.') ?? '<root>'
					console.error(`${path}: ${issue.message}`)
				})
				process.exit(1)
			}

			insert(output)
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding ${label}:`, err)
		process.exit(1)
	}
}

export function get_property_assignments(
	structure: v.InferOutput<typeof structure_yaml_schema>
) {
	return [
		...structure.satisfied_properties.map((entry) => ({
			...entry,
			is_satisfied: 1 as const
		})),
		...structure.unsatisfied_properties.map((entry) => ({
			...entry,
			is_satisfied: 0 as const
		})),
		...(structure.undecidable_properties ?? []).map((entry) => ({
			...entry,
			is_satisfied: null
		}))
	]
}
