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

const combinations = db
	.prepare<[StructureType], { structure_id: string; p: string; q: string }>(
		`SELECT
			a.structure_id,
			a.property_id AS p,
			an.property_id AS q
		FROM property_assignments a
		JOIN property_assignments an
			ON an.structure_id = a.structure_id AND an.type = a.type
		WHERE a.type = ?
			AND a.is_satisfied = TRUE
			AND an.is_satisfied = FALSE`
	)
	.all(type)

const other_combination_keys: Set<string> = new Set(
	combinations
		.filter(({ structure_id }) => !structure_ids.includes(structure_id))
		.flatMap(({ p, q }) => combination_keys(p, q))
)

const unique_combinations: { p: string; q: string }[] = []

for (const { p, q, structure_id } of combinations) {
	if (
		structure_ids.includes(structure_id) &&
		combination_keys(p, q).every((key) => !other_combination_keys.has(key)) &&
		unique_combinations.every((comb) => comb.p != p || comb.q !== q)
	) {
		unique_combinations.push({ p, q })
	}
}

const dual_combinations: { p: string; q: string }[] = []

for (const { p, q } of unique_combinations) {
	const dual_p = dual_property_ids.get(p)
	const dual_q = dual_property_ids.get(q)
	if (!dual_p || !dual_q) continue

	if (unique_combinations.every((comb) => comb.p != dual_p || comb.q != dual_q)) {
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

function combination_keys(p: string, q: string): string[] {
	const keys = new Set([`${p}|${q}`])
	const dual_p = dual_property_ids.get(p)
	const dual_q = dual_property_ids.get(q)
	if (dual_p && dual_q) keys.add(`${dual_p}|${dual_q}`)
	return [...keys]
}
