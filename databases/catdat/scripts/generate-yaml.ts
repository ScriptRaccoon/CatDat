import { get_client } from './shared'
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'

// TEMPORARY SCRIPT TO GENERATE THE YAML FILES FOR ALL SQL SEED DATA
// THE CODE IS UGLY ON PURPOSE.

const db = get_client()

const implications_db = db
	.prepare(
		`SELECT id, assumptions, conclusions, reason, is_equivalence FROM category_implications_view`,
	)
	.all() as {
	id: string
	assumptions: string
	conclusions: string
	reason: string
	is_equivalence: number
}[]

const implications = implications_db.map((impl) => ({
	id: impl.id,
	assumptions: JSON.parse(impl.assumptions),
	conclusions: JSON.parse(impl.conclusions),
	reason: impl.reason,
	is_equivalence: Boolean(impl.is_equivalence),
}))

let file_content = YAML.stringify(implications, {
	indent: 2,
	lineWidth: 2000,
})

file_content = file_content.replaceAll('\n- id: ', '\n\n- id: ')

const file_path = path.join(
	process.cwd(),
	'databases',
	'catdat',
	'data_yaml',
	'implications',
	`all.yaml`,
)
fs.writeFileSync(file_path, file_content, 'utf8')
