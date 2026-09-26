import { devlog } from '$shared/utils'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const schema_folder = path.resolve('database', 'schema')

export function create_schema_hash(): string {
	const schema = fs
		.readdirSync(schema_folder, 'utf8')
		.filter((file) => file.endsWith('.sql'))
		.sort()
		.map((file) => fs.readFileSync(path.join(schema_folder, file), 'utf8'))
		.join('\n')
	return sha256_hex(schema)
}

function sha256_hex(input: string): string {
	return createHash('sha256').update(input).digest('hex')
}

export function write_schema_hash(hash: string) {
	fs.writeFileSync(
		path.join(schema_folder, 'schema.json'),
		JSON.stringify({ hash }),
		'utf8'
	)
}

function get_saved_schema_hash() {
	try {
		const txt = fs.readFileSync(path.join(schema_folder, 'schema.json'), 'utf8')
		const json = JSON.parse(txt) as { hash: string }
		return json.hash
	} catch (_) {
		return ''
	}
}

/**
 * Checks if the schema is up-to-date, and throws an error otherwise.
 */
export function check_schema() {
	devlog(`\nCheck schema ...`)

	const schema_hash = get_saved_schema_hash()
	const actual_hash = create_schema_hash()

	if (schema_hash !== actual_hash) {
		console.error(`❌ Your schema appears to be outdated. Run first pnpm db:setup.`)
		process.exit(1)
	}
}
