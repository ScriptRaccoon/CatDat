import chokidar from 'chokidar'
import path from 'path'
import { exec } from 'node:child_process'

const data_folder = path.join(process.cwd(), 'databases', 'catdat', 'data')

function onchange(file: string) {
	console.info(`File changed: ${file}`)

	exec('pnpm db:update', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`)
			return
		}
		if (stderr) {
			console.error(`Stderr: ${stderr}`)
			return
		}
		console.info(stdout)
	})
}

const watcher = chokidar.watch(data_folder, {
	persistent: true,
	ignoreInitial: true,
})

watcher.on('add', onchange).on('change', onchange).on('unlink', onchange)

console.info(`Watching folder: ${data_folder}`)
