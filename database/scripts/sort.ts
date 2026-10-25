import fs from 'node:fs'
import path from 'node:path'
import { format, resolveConfig } from 'prettier'
import { deep_sort, devlog } from '#shared/utils.ts'

/**
 * Sorts the arrays and keys in the JSON files of the test data alphabetically,
 * so that they are easy to read and new entries can be added anywhere.
 */

const JSON_FOLDERS = [
	path.resolve('database', 'scripts', 'expected-data'),
	path.resolve('database', 'scripts', 'decided-structures')
]

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

for (const folder of JSON_FOLDERS) {
	const files = fs.readdirSync(folder).filter((file) => file.endsWith('.json'))
	for (const file of files) {
		await sort_file(path.join(folder, file))
	}
}

devlog('✅ Sorted JSON files')
