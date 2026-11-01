import fs from 'node:fs'
import path from 'node:path'
import { format, resolveConfig } from 'prettier'
import { deep_sort, devlog } from '#shared/utils.ts'
import { TEST_DATA_FOLDER } from './utils/folders'

/**
 * Sorts the arrays and keys in the JSON files of the test data alphabetically,
 * so that they are easy to read and new entries can be added anywhere.
 */

const JSON_FILES = fs
	.readdirSync(TEST_DATA_FOLDER, { recursive: true, encoding: 'utf8' })
	.filter((file) => file.endsWith('.json'))
	.map((file) => path.join(TEST_DATA_FOLDER, file))

async function sort_file(file: string) {
	const content = fs.readFileSync(file, 'utf8')
	const data: unknown = JSON.parse(content)
	const options = await resolveConfig(file)
	const sorted_content = JSON.stringify(deep_sort(data))
	const updated_content = await format(sorted_content, { ...options, filepath: file })
	if (updated_content === content) return
	fs.writeFileSync(file, updated_content)
	console.info(`Sorted ${path.relative(process.cwd(), file)}`)
}

for (const file of JSON_FILES) {
	await sort_file(file)
}

devlog('✅ Sorted JSON files')
