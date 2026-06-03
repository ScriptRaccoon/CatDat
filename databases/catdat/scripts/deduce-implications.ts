import { StructureType } from './config'
import { are_equal_sets, get_client } from './utils/helpers'

const db = get_client()

/**
 * Deduces implications from given ones.
 */
export function deduce_implications() {
	console.info('\n--- Deduce implications ---')

	clear_all_deduced_implications()
	dualize_implications('category')
	dualize_implications('functor')
	create_self_dual_implications()
}

/**
 * Removes all deduced implications.
 */
function clear_all_deduced_implications() {
	db.prepare(`DELETE FROM implications WHERE is_deduced = TRUE`).run()
}

type ImplicationProperty = {
	id: string
	is_equivalence: 0 | 1
	kind: 'assumption' | 'conclusion'
	structure: 'self' | 'source' | 'target'
	property_id: string
	dual_property_id: string | null
}

type ImplicationFull = {
	id: string
	is_equivalence: 0 | 1
	properties: {
		id: string
		dual: string | null
		kind: 'assumption' | 'conclusion'
		structure: 'self' | 'source' | 'target'
	}[]
}

/**
 * Dualizes all implications by dualizing the involved properties
 * (in case they have a dual). For example, if P ===> Q holds,
 * then P^op ===> Q^op holds as well.
 */
function dualize_implications(type: StructureType) {
	const implication_properties_query = db.prepare<[string], ImplicationProperty>(`
		SELECT
			i.id,
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
		WHERE i.is_deduced = FALSE AND i.type = ?
		ORDER BY i.id
	`)

	const dual_implication_insert = db.prepare(`
		INSERT INTO implications
			(id, type, is_equivalence, is_deduced, dualized_from, proof)
		VALUES (?, ?, ?, TRUE, ?, ?)
	`)

	const implication_property_insert = db.prepare(`
		INSERT INTO implication_properties
			(implication_id, property_id, type, kind, structure)
		VALUES (?, ?, ?, ?, ?)
	`)

	const tx = db.transaction(() => {
		const implication_properties = implication_properties_query.all(type)
		const implications_dict = get_implications_dict(implication_properties)
		const count = Object.values(implications_dict).length

		for (const impl of Object.values(implications_dict)) {
			dual_implication_insert.run(
				`dual_${impl.id}`,
				type,
				impl.is_equivalence,
				impl.id,
				'This follows from the dual implication.',
			)

			for (const p of impl.properties) {
				implication_property_insert.run(
					`dual_${impl.id}`,
					p.dual,
					type,
					p.kind,
					p.structure,
				)
			}
		}

		console.info(`Deduced ${count} ${type} implications by duality`)
	})

	tx()
}

/**
 * Checks if all properties of an implication have a dual
 * and that the dualized implication is different from the original.
 */
function is_dualizable(impl: ImplicationFull): boolean {
	if (impl.properties.some((p) => !p.dual)) return false

	const kinds = new Set(impl.properties.map((p) => p.kind))
	const structures = new Set(impl.properties.map((p) => p.structure))

	for (const kind of kinds) {
		for (const structure of structures) {
			const props = impl.properties.filter(
				(p) => p.kind === kind && p.structure === structure,
			)
			if (!props.length) continue
			const prop_ids = new Set(props.map((p) => p.id))
			const dual_prop_ids = new Set(props.map((p) => p.dual))
			if (!are_equal_sets(prop_ids, dual_prop_ids)) return true
		}
	}

	return false
}

function get_implications_dict(
	implication_properties: ImplicationProperty[],
): Record<string, ImplicationFull> {
	const implications_dict: Record<string, ImplicationFull> = {}

	for (const impl_prop of implication_properties) {
		const { id, is_equivalence, property_id, dual_property_id, kind, structure } =
			impl_prop
		implications_dict[id] ??= { id, is_equivalence, properties: [] }

		implications_dict[id].properties.push({
			id: property_id,
			dual: dual_property_id,
			kind,
			structure,
		})
	}

	for (const id in implications_dict) {
		if (!is_dualizable(implications_dict[id])) {
			delete implications_dict[id]
		}
	}

	return implications_dict
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
