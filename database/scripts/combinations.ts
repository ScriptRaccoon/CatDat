import { get_client } from '$shared/db'
import { is_structure_type, type StructureType } from '$shared/config'
import { remove_underscores } from '$shared/utils'

/**
 * This script prints the combinations of the form p ∧ ¬q
 * that are witnessed by a given structure but by no other
 * structure in the database. In particular, it can be used
 * when adding new structures to the database to detect which
 * combinations are newly witnessed.
 */

const db = get_client({ readonly: true })

const args = process.argv.slice(2)

const [structure_id, type] = args

if (args.length !== 2 || !structure_id || !type) {
	console.error('Expected exactly 2 arguments: <structure-id> <structure-type>.')
	process.exit(1)
}

if (!is_structure_type(type)) {
	console.error(`Unknown structure type: ${type}`)
	process.exit(1)
}

const structure = db
	.prepare<
		[string, StructureType],
		{ id: string }
	>(`SELECT id FROM structures WHERE id = ? AND type = ?`)
	.get(structure_id, type)

if (!structure) {
	console.error(
		`No ${remove_underscores(type)} with ID "${structure_id}" exists in the database.`
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

const other_combinations = new Set(
	combinations
		.filter((comb) => comb.structure_id !== structure_id)
		.flatMap(({ p, q }) => combination_keys(p, q))
)

const unique_combinations = combinations
	.filter(
		(comb) =>
			comb.structure_id === structure_id &&
			combination_keys(comb.p, comb.q).every((key) => !other_combinations.has(key))
	)
	.map(({ p, q }) => ({ p, q }))

console.info(
	`Found ${unique_combinations.length} unique witnessed combinations for ${remove_underscores(type)} with ID "${structure_id}":`
)

if (unique_combinations.length === 0) {
	console.info('None')
	process.exit(0)
}

for (const { p, q } of unique_combinations) {
	console.info(`- ${p} ∧ ¬${q}`)
}

function combination_keys(p: string, q: string): string[] {
	const keys = new Set<string>([`${p}|${q}`])
	const dual_p = dual_property_ids.get(p) ?? null
	const dual_q = dual_property_ids.get(q) ?? null
	if (dual_p && dual_q) keys.add(`${dual_p}|${dual_q}`)
	return [...keys]
}
