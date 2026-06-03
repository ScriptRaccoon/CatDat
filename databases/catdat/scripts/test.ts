/**
 * This file is executed via `pnpm db:test`.
 * It checks that the data behaves as expected.
 * If not, an error is thrown, which must be fixed.
 */

import Set_expected from './expected-data/Set.json'
import Ab_expected from './expected-data/Ab.json'
import Top_expected from './expected-data/Top.json'
import forget_vector_expected from './expected-data/forget_vector.json'
import id_Set_expected from './expected-data/id_Set.json'
import decided_categories from './expected-data/decided-categories.json'
import decided_functors from './expected-data/decided-functors.json'
import { capitalize, get_client } from './utils/helpers'
import { StructureType } from './config'

const db = get_client()

execute_tests()

/**
 * The main test function verifying that the data behaves as expected.
 */
function execute_tests() {
	try {
		console.info('\n--- Test categories ---')
		test_mutual_structure_duals('category')
		test_properties_of_trivial_category()
		test_mutual_property_duals('category')
		test_decided_structures(decided_categories, 'category')
		test_properties_of_selected_structures({
			Set: Set_expected,
			Ab: Ab_expected,
			Top: Top_expected,
		})

		console.info('\n--- Test functors ---')
		test_mutual_property_duals('functor')
		test_decided_structures(decided_functors, 'functor')
		test_properties_of_selected_structures({
			forget_vector: forget_vector_expected,
			id_Set: id_Set_expected,
		})
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.message)
		} else {
			console.error(err)
		}
		process.exit(1)
	}
}

/**
 * Tests for all structures C,D that if C is dual to D, then D is dual to C.
 */
function test_mutual_structure_duals(type: StructureType) {
	const dict: Record<string, string | null> = {}

	const structures = db
		.prepare<[string], { id: string; dual_structure_id: string | null }>(
			`SELECT structure_id as id, dual_structure_id
			FROM dual_structures WHERE type = ?`,
		)
		.all(type)

	for (const { id, dual_structure_id } of structures) {
		dict[id] = dual_structure_id
	}

	for (const id in dict) {
		const dual = dict[id]
		if (dual && dict[dual] !== id) {
			throw new Error(`❌ Found non-mutual structure duality: ${id}, ${dual}`)
		}
	}

	console.info(`✅ Structures of type ${type} are mutually dual`)
}

/**
 * Tests that the trivial category has no unsatisfied property.
 * This enforces that all properties in the database are "positive".
 */
function test_properties_of_trivial_category() {
	const rows = db
		.prepare(
			`SELECT property_id FROM property_assignments
			WHERE
				type = 'category' AND structure_id = '1'
				AND is_satisfied = FALSE`,
		)
		.all()

	if (rows.length > 0) {
		throw new Error(
			`❌ The trivial category has ${rows.length} unsatisfied properties, but it should have 0.`,
		)
	}

	console.info(`✅ The trivial category has no unsatisfied properties`)
}

/**
 * Tests for all properties p,q of categories or functors that
 * if p is dual to q, then q is dual to p.
 */
function test_mutual_property_duals(type: StructureType) {
	const dict: Record<string, string> = {}

	const properties = db
		.prepare<[string], { id: string; dual_property_id: string }>(
			`SELECT property_id AS id, dual_property_id
			FROM dual_properties WHERE type = ?`,
		)
		.all(type)

	for (const { id, dual_property_id } of properties) {
		dict[id] = dual_property_id
	}

	for (const id in dict) {
		const dual = dict[id]
		if (dict[dual] !== id) {
			throw new Error(`❌ Found non-mutual property duality: ${id}, ${dual}`)
		}
	}

	console.info(`✅ ${capitalize(type)} properties are mutually dual`)
}

/**
 * Tests that for a specified list of categories or functors all properties have
 * been decided. If this test fails, property assignments or implications are missing.
 */
function test_decided_structures(structure_ids: string[], type: StructureType) {
	const unknown_query = db.prepare<[string, string], { id: string }>(
		`SELECT p.id FROM properties p WHERE type = ? AND NOT EXISTS
			(SELECT 1 FROM property_assignments
				WHERE structure_id = ? AND property_id = p.id
			)
		`,
	)

	for (const structure_id of structure_ids) {
		const unknown_properties = unknown_query
			.all(type, structure_id)
			.map((row) => row.id)

		if (unknown_properties.length > 0) {
			throw new Error(
				`❌ Found unknown properties of ${structure_id}:\n${unknown_properties.join(', ')}.\nEvery property needs to be decided for this ${type}.`,
			)
		}

		console.info(`✅ All properties have been decided for ${structure_id}`)
	}
}

/**
 * Tests if selected categories or functors behave as expected:
 * All of their properties in the database have to match those in the
 * respective JSON files in the subfolder "expected-data".
 * We exclude undecidable properties here.
 */
function test_properties_of_selected_structures(
	expected: Record<string, Record<string, boolean>>,
) {
	const property_query = db.prepare<
		[string],
		{ property_id: string; is_satisfied: 0 | 1 }
	>(
		`SELECT property_id, is_satisfied FROM property_assignments
		WHERE structure_id = ? AND is_satisfied IS NOT NULL`,
	)

	for (const structure_id in expected) {
		const properties = property_query.all(structure_id)

		for (const { property_id, is_satisfied } of properties) {
			const ok = Boolean(is_satisfied) === expected[structure_id][property_id]
			if (ok) continue
			throw new Error(`❌ Incorrect property of ${structure_id}: ${property_id}`)
		}

		console.info(`✅ Properties of ${structure_id} are correct`)
	}
}
