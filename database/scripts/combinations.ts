import { get_client } from '$shared/db'
import { is_structure_type, type StructureType } from '$shared/config'
import { remove_underscores } from '$shared/utils'

/**
 * This script prints the combinations of the form p ∧ ¬q
 * that are witnessed by the supplied structures (or their duals)
 * but not by any other structure in the database.
 */

const db = get_client({ readonly: true })

const args = process.argv.slice(2)

const [type, ...structure_ids] = args

if (!type || structure_ids.length === 0) {
	console.error(
		'Expected arguments: <structure-type> <structure-id> <structure-id> ...'
	)
	process.exit(1)
}

if (!is_structure_type(type)) {
	console.error(`Unknown structure type: ${type}`)
	process.exit(1)
}

const all_structure_ids = db
	.prepare<[StructureType], string>(`SELECT id FROM structures WHERE type = ?`)
	.pluck()
	.all(type)

const set_all_structure_ids = new Set(all_structure_ids)
const unknown_structure_ids = structure_ids.filter((id) => !set_all_structure_ids.has(id))

if (unknown_structure_ids.length > 0) {
	console.error(
		`No ${remove_underscores(type)} with ID "${unknown_structure_ids[0]}" exists in the database.`
	)
	process.exit(1)
}

const property_duals = db
	.prepare<
		[StructureType],
		{ id: string; dual_property_id: string | null }
	>(`SELECT id, dual_property_id FROM properties WHERE type = ?`)
	.all(type)

const dual_property_ids = new Map(
	property_duals.map(({ id, dual_property_id }) => [id, dual_property_id])
)

const structure_placeholders = structure_ids.map(() => '?').join(', ')

const unique_combinations = db
	.prepare<[StructureType, ...string[]], { p: string; q: string }>(
		`WITH selected AS (
			SELECT DISTINCT a.property_id AS p, an.property_id AS q
			FROM property_assignments a
			JOIN property_assignments an
				ON an.structure_id = a.structure_id AND an.type = a.type
			WHERE a.type = ?
				AND a.structure_id IN (${structure_placeholders})
				AND a.is_satisfied = TRUE
				AND an.is_satisfied = FALSE
		)
		SELECT selected.p, selected.q
		FROM selected
		JOIN properties p ON p.id = selected.p AND p.type = ?
		JOIN properties q ON q.id = selected.q AND q.type = ?
		WHERE NOT EXISTS (
			SELECT 1
			FROM property_assignments a
			JOIN property_assignments an
				ON an.structure_id = a.structure_id AND an.type = a.type
			WHERE a.type = ?
				AND a.structure_id NOT IN (${structure_placeholders})
				AND a.is_satisfied = TRUE
				AND an.is_satisfied = FALSE
				AND (
					(a.property_id = selected.p AND an.property_id = selected.q)
					OR (a.property_id = p.dual_property_id AND an.property_id = q.dual_property_id)
				)
		)`
	)
	.all(type, ...structure_ids, type, type, type, ...structure_ids)

const unique_combination_keys = new Set(
	unique_combinations.map(({ p, q }) => combination_key(p, q))
)

const dual_combinations: { p: string; q: string }[] = []

for (const key of unique_combination_keys) {
	const { p, q } = decode_combination_key(key)
	const dual_p = dual_property_ids.get(p)
	const dual_q = dual_property_ids.get(q)
	if (!dual_p || !dual_q) continue

	const dual_key = combination_key(dual_p, dual_q)

	if (dual_key && !unique_combination_keys.has(dual_key)) {
		dual_combinations.push({ p: dual_p, q: dual_q })
	}
}

const all_unique_combinations = [...unique_combinations, ...dual_combinations]

console.info(
	`Found ${all_unique_combinations.length} unique witnessed combinations by the supplied structures (${structure_ids.join(', ')}):`
)

if (all_unique_combinations.length === 0) {
	console.info('\nNone')
	process.exit(0)
}

console.info('\nDirectly witnessed:')
for (const { p, q } of unique_combinations) {
	console.info(`- ${p} ∧ ¬${q}`)
}

if (dual_combinations.length > 0) {
	console.info('\nDually witnessed:')
	for (const { p, q } of dual_combinations) {
		console.info(`- ${p} ∧ ¬${q}`)
	}
}

// Helper functions

function combination_key(p: string, q: string) {
	return `${p}|${q}`
}

function decode_combination_key(key: string) {
	const separator = key.indexOf('|')
	return { p: key.slice(0, separator), q: key.slice(separator + 1) }
}
