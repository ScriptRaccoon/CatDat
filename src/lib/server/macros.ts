import YAML from 'yaml'
import path from 'node:path'
import fs from 'node:fs'

export const MACROS = YAML.parse(
	fs.readFileSync(
		path.join(process.cwd(), 'databases', 'catdat', 'data', 'macros.yaml'),
		'utf8',
	),
) as Record<string, string>
