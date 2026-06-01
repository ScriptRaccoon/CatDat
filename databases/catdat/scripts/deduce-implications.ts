import { StructureType } from './config'
import { get_client } from './utils/helpers'

const db = get_client()

/**
 * Deduces implications from given ones.
 */
export function deduce_implications() {
	clear_all_deduced_implications()
	dualize_implications()
	create_self_dual_implications()
}

/**
 * Removes all deduced implications.
 */
function clear_all_deduced_implications() {
	db.prepare(`DELETE FROM implications WHERE is_deduced = TRUE`).run()
}

/**
 * Dualizes all implications by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well.
 */
function dualize_implications() {
	type ImplicationRow = {
		id: string
		type: StructureType
		is_equivalence: 0 | 1
		kind: string
		structure: string
		property_id: string
		dual_property_id: string
	}

	const implications_query = db.prepare<never[], ImplicationRow>(`
		SELECT
			i.id,
            i.type,
			i.is_equivalence,
			ip.kind,
            ip.structure,
			ip.property_id,
			d.dual_property_id
		FROM implications i
		INNER JOIN implication_properties ip
		ON ip.implication_id = i.id
		LEFT JOIN dual_properties d
		ON d.property_id = ip.property_id
		WHERE i.is_deduced = FALSE
		AND NOT EXISTS (
			SELECT 1 FROM implication_properties ip2
			LEFT JOIN dual_properties d2
			ON d2.property_id = ip2.property_id
			WHERE ip2.implication_id = i.id
			AND d2.dual_property_id IS NULL
		)
		ORDER BY i.type, i.id
	`)

	// TODO: filter out implications that dualize to the same sets of assumptions / conclusions

	const seen = new Set<string>()

	const dual_implication_query = db.prepare(`
		INSERT INTO implications
			(id, type, is_equivalence, is_deduced, dualized_from, proof)
		VALUES (?, ?, ?, TRUE, ?, ?)
	`)

	const implication_property_query = db.prepare(`
		INSERT INTO implication_properties
			(implication_id, property_id, type, kind, structure)
		VALUES (?, ?, ?, ?, ?)
	`)

	const tx = db.transaction(() => {
		const implications = implications_query.all()

		for (const impl of implications) {
			if (!seen.has(impl.id)) {
				dual_implication_query.run(
					`dual_${impl.id}`,
					impl.type,
					impl.is_equivalence,
					impl.id,
					'This follows from the dual implication.',
				)

				seen.add(impl.id)
			}

			implication_property_query.run(
				`dual_${impl.id}`,
				impl.dual_property_id,
				impl.type,
				impl.kind,
				impl.structure,
			)
		}
	})

	tx()

	console.info(`Deduced ${seen.size} implications by duality`)
}

/**
 * Creates all trivial implications of the form
 * self-dual + P ===> P^op
 * This is currently only applicable to properties of categories.
 */
function create_self_dual_implications() {
	const properties_query = db.prepare<
		never[],
		{ property_id: string; dual_property_id: string; type: string }
	>(`
		SELECT
			d.property_id,
			d.dual_property_id,
			p.type
		FROM
			dual_properties d
		INNER JOIN properties p
		ON p.id = d.property_id
		WHERE
			p.invariant_under_equivalences = TRUE
			AND p.id != 'self-dual'
			AND p.id != d.dual_property_id
			AND p.type != 'functor'
	`)

	const self_dual_implication_query = db.prepare(`
		INSERT INTO implications
			(id, type, is_equivalence, is_deduced, proof)
		VALUES (?, ?, FALSE, TRUE, 'This holds by self-duality.')
	`)

	const implication_property_query = db.prepare(`
		INSERT INTO implication_properties
			(implication_id, property_id, type, kind, structure)
		VALUES (?, ?, ?, ?, 'self')
	`)

	const tx = db.transaction(() => {
		const property_pairs = properties_query.all()

		for (const { property_id, dual_property_id, type } of property_pairs) {
			const id = `self-dual_${property_id}`

			self_dual_implication_query.run(id, type)

			implication_property_query.run(id, 'self-dual', type, 'assumption')
			implication_property_query.run(id, property_id, type, 'assumption')
			implication_property_query.run(id, dual_property_id, type, 'conclusion')
		}

		console.info(`Deduced ${property_pairs.length} implications by self-duality`)
	})

	tx()
}
