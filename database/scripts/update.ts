import chokidar from 'chokidar'
import { run_command } from './utils/commands'
import { DATA_FOLDER } from './utils/folders'
import { mark_database_update } from '#shared/db.ts'

const watch_mode = process.argv.includes('--watch')
const update_commands = ['db:sort', 'db:seed', 'db:deduce', 'db:test', 'db:snapshot']

if (watch_mode) {
	watch()
} else {
	void run_update()
}

/**
 * Recreates and updates the complete database by sorting the test data,
 * seeding the data, deducing properties, testing the results,
 * and creating a snapshot file.
 */
async function run_update() {
	console.info('\n--- Update CatDat database ---')
	for (const command of update_commands) {
		await run_command(command)
	}
	mark_database_update()
}

function watch() {
	let update_timer: NodeJS.Timeout | undefined

	async function run_watched_update() {
		try {
			await run_update()
		} catch (error) {
			console.error(error instanceof Error ? error.message : error)
		}
	}

	function on_change(file: string) {
		console.info(`File changed: ${file}`)
		if (update_timer) clearTimeout(update_timer)
		update_timer = setTimeout(() => void run_watched_update(), 150)
	}

	const watcher = chokidar.watch(DATA_FOLDER, {
		persistent: true,
		ignoreInitial: true,
		awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 50 }
	})

	watcher.on('add', on_change).on('change', on_change).on('unlink', on_change)
	console.info(`Watching folder: ${DATA_FOLDER}`)
}
