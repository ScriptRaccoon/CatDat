import { readFileSync } from 'node:fs'

if (process.env.CI) {
	process.exit(0)
}

function get_environment_variables(path: string): string[] {
	let file = ''
	try {
		file = readFileSync(path, 'utf8')
	} catch (_) {
		console.error(`❌ ${path} does not exist. Please create it first.`)
		process.exit(1)
	}

	return file
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line !== '' && !line.startsWith('#'))
		.map((line) => line.split('=', 1)[0].trim())
}

const actual_variables = get_environment_variables('.env')
const example_variables = get_environment_variables('.env.example')

if (!actual_variables.length) {
	console.error(
		'❌ .env does not contain any environment variables. Please update it from .env.example.'
	)
	process.exit(1)
}

const are_the_same =
	actual_variables.length === example_variables.length &&
	example_variables.every((v) => actual_variables.includes(v))

if (are_the_same) {
	console.info('✅ Environment variables are up to date.')
} else {
	console.error('❌ .env is out of date. Please update it to match .env.example.')
	process.exit(1)
}
