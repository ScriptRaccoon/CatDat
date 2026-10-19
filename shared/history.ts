import fs from 'node:fs'
import path from 'node:path'
import type { StructureType } from './config'
import history_json from './history.json'

/**
 * The history lists structures and properties in the order they were added.
 * New entries are appended by the seed script.
 */
export type History = Record<
	'structures' | 'properties',
	{ type: StructureType; id: string }[]
>

export const history = history_json as History

const history_file = path.resolve('shared', 'history.json')

let history_changed = false

/**
 * Appends the structure or property to the history in case it is new.
 */
export function record_addition(kind: keyof History, type: StructureType, id: string) {
	if (history[kind].some((entry) => entry.type === type && entry.id === id)) return

	history[kind].push({ type, id })
	history_changed = true
}

/**
 * Writes the history to its file in case it has changed.
 */
export function save_history() {
	if (!history_changed) return
	fs.writeFileSync(history_file, `${JSON.stringify(history, null, '\t')}\n`)
}
