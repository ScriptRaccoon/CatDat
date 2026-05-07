import { get_client } from './shared'
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'

// TEMPORARY SCRIPT TO GENERATE THE YAML FILES FOR ALL SQL SEED DATA
// THE CODE IS UGLY ON PURPOSE.

const db = get_client()

const lemmas = db
	.prepare(`SELECT id, title, claim, proof FROM lemmas ORDER BY id`)
	.all() as {
	id: string
	title: string
	claim: string
	proof: string
}[]

for (const lemma of lemmas) {
	let file_content = YAML.stringify(lemma, {
		indent: 2,
		lineWidth: 2000,
	})

	file_content = file_content.replace('\ntitle:', '\n\ntitle:')
	file_content = file_content.replace('\nclaim:', '\n\nclaim:')
	file_content = file_content.replace('\nproof:', '\n\nproof:')

	const file_path = path.join(
		process.cwd(),
		'databases',
		'catdat',
		'data_yaml',
		'lemmas',
		`${lemma.id}.yaml`,
	)
	fs.writeFileSync(file_path, file_content, 'utf8')
}
