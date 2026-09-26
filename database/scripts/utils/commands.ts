import { spawn } from 'node:child_process'

export function run_command(command: string) {
	return new Promise<void>((resolve, reject) => {
		const child = spawn('pnpm', [command], { stdio: 'inherit' })

		child.once('error', reject)
		child.once('close', (code) => {
			if (code === 0) {
				resolve()
			} else {
				reject(new Error(`pnpm ${command} exited with code ${code}`))
			}
		})
	})
}
