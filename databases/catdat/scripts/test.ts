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
import { StructureType } from './types'

const db = get_client()

execute_tests()

/**
 * The main test function verifying that the data behaves as expected.
 */
function execute_tests() {
	try {
		console.info('\n--- Test categories ---')
		test_mutual_category_duals()
		test_properties_of_trivial_category()
		test_mutual_property_duals('category')
		test_decided_structures(decided_categories, 'category')
		test_properties_of_selected_structures(
			{ Set: Set_expected, Ab: Ab_expected, Top: Top_expected },
			'category',
		)

		console.info('\n--- Test functors ---')
		test_mutual_property_duals('functor')
		test_decided_structures(decided_functors, 'functor')
		test_properties_of_selected_structures(
			{ forget_vector: forget_vector_expected, id_Set: id_Set_expected },
			'functor',
		)
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
 * Tests for all categories C,D that if C is dual to D, then D is dual to C.
 */
function test_mutual_category_duals() {
	const dict: Record<string, string | null> = {}

	const categories = db
		.prepare('SELECT id, dual_category_id FROM categories')
		.all() as { id: string; dual_category_id: string | null }[]

	for (const { id, dual_category_id } of categories) {
		dict[id] = dual_category_id
	}

	for (const id in dict) {
		const dual = dict[id]
		if (dual && dict[dual] !== id) {
			throw new Error(`❌ Found non-mutual category duality: ${id}, ${dual}`)
		}
	}

	console.info(`✅ Categories are mutually dual`)
}

/**
 * Tests that the trivial category has no unsatisfied property.
 * This enforces that all properties in the database are "positive".
 */
function test_properties_of_trivial_category() {
	const rows = db
		.prepare(
			`SELECT property_id FROM category_property_assignments
			WHERE category_id = '1' AND is_satisfied = FALSE`,
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
	const dict: Record<string, string | null> = {}

	const properties = db
		.prepare(`SELECT id, dual_property_id FROM ${type}_properties`)
		.all() as { id: string; dual_property_id: string | null }[]

	for (const { id, dual_property_id } of properties) {
		dict[id] = dual_property_id
	}

	for (const id in dict) {
		const dual = dict[id]
		if (dual && dict[dual] !== id) {
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
	const unknown_query = db.prepare(
		`SELECT p.id FROM ${type}_properties p WHERE NOT EXISTS
			(SELECT 1 FROM ${type}_property_assignments
				WHERE ${type}_id = ? AND property_id = p.id
			)
		`,
	)

	for (const structure_id of structure_ids) {
		const res = unknown_query.all(structure_id) as { id: string }[]
		const unknown_properties = res.map((row) => row.id)

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
	type: StructureType,
) {
	const property_query = db.prepare(
		`SELECT property_id, is_satisfied FROM ${type}_property_assignments
		WHERE ${type}_id = ? AND is_satisfied IS NOT NULL`,
	)

	for (const structure_id in expected) {
		const properties = property_query.all(structure_id) as {
			property_id: string
			is_satisfied: 0 | 1
		}[]

		for (const { property_id, is_satisfied } of properties) {
			const ok = Boolean(is_satisfied) === expected[structure_id][property_id]
			if (ok) continue
			throw new Error(`❌ Incorrect property of ${structure_id}: ${property_id}`)
		}

		console.info(`✅ Properties of ${structure_id} are correct`)
	}
}
