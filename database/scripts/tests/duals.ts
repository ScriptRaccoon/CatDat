import { db } from './db'
import { type StructureType, PLURALS } from '#shared/config.ts'
import { capitalize, devlog, remove_underscores } from '#shared/utils.ts'

/**
 * Tests for all structures of a given type C,D that if
 * C is dual to D, then D is dual to C, and that one of them
 * is the original structure, i.e. the ID of the other is `{id}_op`.
 */
export function test_mutual_structure_duals(type: StructureType) {
	const dict: Record<string, string> = {}

	const structures_with_duals = db
		.prepare<[StructureType], { id: string; dual: string }>(
			`SELECT id, dual_structure_id AS dual
			FROM structures
			WHERE type = ? AND dual_structure_id IS NOT NULL`
		)
		.all(type)

	if (structures_with_duals.length === 0) return

	for (const { id, dual } of structures_with_duals) {
		dict[id] = dual
	}

	for (const id in dict) {
		const dual = dict[id]
		if (dict[dual] !== id) {
			throw new Error(
				`❌ Found non-mutual ${remove_underscores(type)} duality: ${id}, ${dual}`
			)
		}

		if (id !== `${dual}_op` && dual !== `${id}_op`) {
			throw new Error(
				`❌ Found ${remove_underscores(type)} duality without original: ${id}, ${dual}. The ID of the dual must be the ID of the original followed by "_op".`
			)
		}
	}

	devlog(`✅ ${capitalize(PLURALS[type])} are mutually dual`)
}

/**
 * Tests that every property of a given type has a dual
 * (except the specified exceptions), and that
 * for all properties p,q, if p is dual to q, then q is dual to p.
 */
export function test_property_duals(type: StructureType, exceptions: string[]) {
	const dict: Record<string, string | null> = {}

	const properties = db
		.prepare<[StructureType], { id: string; dual_property_id: string | null }>(
			`SELECT id, dual_property_id FROM properties WHERE type = ?`
		)
		.all(type)

	for (const { id, dual_property_id } of properties) {
		dict[id] = dual_property_id
	}

	for (const id in dict) {
		const dual = dict[id]
		const is_exception = exceptions.includes(id)

		if (!dual && !is_exception) {
			throw new Error(`❌ Found property without dual: ${id}`)
		}

		if (dual && is_exception) {
			throw new Error(
				`❌ Found property with dual in properties_without_dual: ${id}`
			)
		}

		if (dual && dict[dual] !== id) {
			throw new Error(`❌ Found non-mutual property duality: ${id}, ${dual}`)
		}
	}

	devlog(`✅ ${capitalize(remove_underscores(type))} properties have mutual duals`)
}
