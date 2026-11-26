import { db } from './db'
import { history } from '#shared/history.ts'
import { devlog } from '#shared/utils.ts'

/**
 * Tests that every entry in the history refers to an existing structure or property,
 * and that the history has as many entries as there are structures and properties.
 * If this test fails, a structure or property has probably been renamed or deleted.
 */
export function test_history_entries_exist() {
	for (const kind of ['structures', 'properties'] as const) {
		const keys = new Set(
			db
				.prepare<never[], string>(`SELECT type || '/' || id FROM ${kind}`)
				.pluck()
				.all()
		)

		const unknown_entries = history[kind].filter(
			({ type, id }) => !keys.has(`${type}/${id}`)
		)

		if (unknown_entries.length > 0) {
			throw new Error(
				`❌ Found unknown ${kind} in history.json:\n${unknown_entries.map(({ type, id }) => `${id} (${type})`).join(', ')}`
			)
		}

		if (history[kind].length !== keys.size) {
			throw new Error(
				`❌ The history has ${history[kind].length} ${kind}, but the database has ${keys.size}.`
			)
		}
	}

	devlog('✅ All entries in the history exist, and their number is correct')
}
