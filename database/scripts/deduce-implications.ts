import { type StructureType, STRUCTURE_TYPES_WITH_DUALS } from '$shared/config'
import {
	are_equal_sets,
	parse_nested_json_set,
	parse_json_set,
	devlog
} from '$shared/utils'
import { get_client } from '$shared/db'

const db = get_client({ readonly: false })

/**
 * Clears all deduced implications. This is done before the deduction starts.
 */
export function clear_deduced_implications(type: StructureType) {
	console.info(`\n--- Deduce ${type} implications ---`)
	db.prepare(`DELETE FROM implications WHERE is_deduced = TRUE AND type = ?`).run(type)
}

/**
 * Dualizes all implications by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well.
 */
export function create_dualized_implications(type: StructureType) {
	const structure_maps = db
		.prepare<[StructureType], { map: string; mapped_type: StructureType }>(
			`SELECT map, mapped_type
			FROM structure_maps WHERE type = ?`
		)
		.all(type)

	const implications_query = db.prepare<
		[StructureType],
		{
			id: string
			is_equivalence: 0 | 1
			assumptions: string
			conclusions: string
			dual_assumptions: string
			dual_conclusions: string
			dual_mapped_assumptions: string
		}
	>(
		`SELECT
			i.id,
			i.is_equivalence,
			i.assumptions,
			i.conclusions,
			(
				SELECT json_group_array(p.dual_property_id)
				FROM assumptions a
				LEFT JOIN properties p
				ON p.id = a.property_id AND p.type = i.type
				WHERE a.implication_id = i.id
			) AS dual_assumptions,
			(
				SELECT json_group_array(p.dual_property_id)
				FROM conclusions a
				LEFT JOIN properties p
				ON p.id = a.property_id AND p.type = i.type
				WHERE a.implication_id = i.id
			) AS dual_conclusions,
			(
				SELECT json_group_object(map, properties)
				FROM (
					SELECT
						a.map,
						json_group_array(p.dual_property_id) AS properties
					FROM mapped_assumptions a
					INNER JOIN properties p
					ON p.id = a.property_id AND p.type = a.property_type
					WHERE a.implication_id = i.id
					GROUP BY a.map
				)
			) AS dual_mapped_assumptions
		FROM implications_view i
		WHERE i.type = ? AND i.is_deduced = FALSE`
	)

	const implications = implications_query.all(type)

	const implication_insert = db.prepare(`
		INSERT INTO implications
			(id, type, is_equivalence, proof, is_deduced)
		VALUES (?, ?, ?, ?, TRUE)	
	`)

	const assumption_insert = db.prepare(`
		INSERT INTO assumptions (implication_id, property_id, type)
		VALUES (?, ?, ?)
	`)

	const conclusion_insert = db.prepare(`
		INSERT INTO conclusions (implication_id, property_id, type)
		VALUES (?, ?, ?)
	`)

	const mapped_assumption_insert = db.prepare(`
		INSERT INTO mapped_assumptions
			(implication_id, map, property_id, type, property_type)
		VALUES (?, ?, ?, ?, ?)
	`)

	const insert_duals = db.transaction(() => {
		let count = 0

		for (const impl of implications) {
			const dual_id = `dual_${impl.id}`

			const assumptions = parse_json_set<string>(impl.assumptions)
			const dual_assumptions = parse_json_set<string | null>(impl.dual_assumptions)
			const conclusions = parse_json_set<string>(impl.conclusions)
			const dual_conclusions = parse_json_set<string | null>(impl.dual_conclusions)
			const dual_mapped_assumptions = parse_nested_json_set<string | null>(
				impl.dual_mapped_assumptions
			)

			if (dual_assumptions.has(null)) continue
			if (dual_conclusions.has(null)) continue

			if (Object.values(dual_mapped_assumptions).some((set) => set?.has(null))) {
				continue
			}

			if (
				are_equal_sets(assumptions, dual_assumptions) &&
				are_equal_sets(conclusions, dual_conclusions)
			) {
				continue
			}

			count++

			implication_insert.run(
				dual_id,
				type,
				impl.is_equivalence,
				`This follows from the <a href="/${type}-implication/${impl.id}">dual implication</a>.`
			)

			for (const a of dual_assumptions) {
				assumption_insert.run(dual_id, a, type)
			}

			for (const c of dual_conclusions) {
				conclusion_insert.run(dual_id, c, type)
			}

			for (const { map, mapped_type } of structure_maps) {
				const duals = dual_mapped_assumptions[map]
				for (const d of duals ?? []) {
					mapped_assumption_insert.run(dual_id, map, d, type, mapped_type)
				}
			}
		}

		devlog(`Deduced ${count} ${type} implications by duality`)
	})

	insert_duals()
}

/**
 * Creates all trivial implications of the form "self-dual + P ===> P^op".
 */
export function create_self_dual_implications(type: StructureType) {
	if (!STRUCTURE_TYPES_WITH_DUALS.includes(type)) return

	const relevant_props = db
		.prepare<[StructureType], { id: string; dual: string }>(
			`SELECT
				id,
				dual_property_id AS dual
			FROM properties
			WHERE
				type = ?
				AND dual_property_id IS NOT NULL
				AND id != dual_property_id
				AND invariant_under_equivalences = TRUE`
		)
		.all(type)

	const implication_insert = db.prepare(`
		INSERT INTO implications
			(id, type, proof, is_deduced)
		VALUES (?, ?, 'This holds by self-duality.', TRUE)	
	`)

	const assumption_insert = db.prepare(`
		INSERT INTO assumptions
			(implication_id, property_id, type)
		VALUES (?, ?, ?)
	`)

	const conclusion_insert = db.prepare(`
		INSERT INTO conclusions
			(implication_id, property_id, type)
		VALUES (?, ?, ?)
	`)

	for (const p of relevant_props) {
		const implication_id = `self-dual_${p.id}`
		implication_insert.run(implication_id, type)
		assumption_insert.run(implication_id, p.id, type)
		assumption_insert.run(implication_id, 'self-dual', type)
		conclusion_insert.run(implication_id, p.dual, type)
	}

	devlog(`Deduced ${relevant_props.length} ${type} implications by self-duality`)
}
