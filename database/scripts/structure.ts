import { get_client } from '#shared/db.ts'
import type { StructureType } from '#shared/config.ts'

/**
 * This script prints the satisfied, unsatisfied, unknown, and undecidable
 * properties of the supplied structure, similar to its detail page.
 */

const db = get_client({ readonly: true })

const GROUPS = ['satisfied', 'unsatisfied', 'unknown', 'undecidable'] as const

type Group = (typeof GROUPS)[number]

const [id, group] = process.argv.slice(2)

if (!id) {
	console.error(`Expected arguments: <structure-id> [${GROUPS.join(' | ')}]`)
	process.exit(1)
}

if (group && !is_group(group)) {
	console.error(`Unknown group: ${group}. Expected one of: ${GROUPS.join(', ')}`)
	process.exit(1)
}

const type = db
	.prepare<[string], StructureType>(`SELECT type FROM structures WHERE id = ?`)
	.pluck()
	.get(id)

if (!type) {
	console.error(`No structure with ID "${id}" exists in the database.`)
	process.exit(1)
}

const assignments = db
	.prepare<[string], { id: string; is_satisfied: 0 | 1 | null }>(
		`SELECT pa.property_id AS id, pa.is_satisfied
		FROM property_assignments pa
		WHERE pa.structure_id = ?
		ORDER BY pa.id`
	)
	.all(id)

const unknown_properties = db
	.prepare<[StructureType, string], string>(
		`SELECT p.id
		FROM properties p
		WHERE p.type = ?
		AND NOT EXISTS (
			SELECT 1 FROM property_assignments
			WHERE structure_id = ? AND property_id = p.id
		)
		ORDER BY lower(p.id)`
	)
	.pluck()
	.all(type, id)

const groups: Record<Group, string[]> = {
	satisfied: assignments.filter((a) => a.is_satisfied === 1).map((a) => a.id),
	unsatisfied: assignments.filter((a) => a.is_satisfied === 0).map((a) => a.id),
	unknown: unknown_properties,
	undecidable: assignments.filter((a) => a.is_satisfied === null).map((a) => a.id)
}

const selected_groups: readonly Group[] = group ? [group as Group] : GROUPS

const output = selected_groups
	.map((label) =>
		[
			`${label} (${groups[label].length}):`,
			...groups[label].map((property_id) => `  ${property_id}`)
		].join('\n')
	)
	.join('\n')

// ignore a closed pipe, e.g. when the output is piped into head
process.stdout.on('error', (err: NodeJS.ErrnoException) => {
	if (err.code !== 'EPIPE') throw err
})

console.info(output)

// Helper functions

function is_group(value: string): value is Group {
	return (GROUPS as readonly string[]).includes(value)
}
