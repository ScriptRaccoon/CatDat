/**
 * This file is executed via `pnpm db:test`.
 * It checks that the data behaves as expected.
 * If not, an error is thrown, which must be fixed.
 */

import Set_expected from './expected-data/Set.json'
import Ab_expected from './expected-data/Ab.json'
import Top_expected from './expected-data/Top.json'
import decided_categories from './expected-data/decided-categories.json'
import { get_client } from './shared'

const db = get_client()

execute_tests()

/**
 * The main test function verifying that the data behaves as expected.
 */
function execute_tests() {
	console.info('\n--- Test database ---')
	try {
		test_mutual_category_duals()
		test_mutual_property_duals()
		test_decided_categories()
		test_properties_of_trivial_category()
		test_properties_of_selected_categories()
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
 * Tests for all category properties p,q that if p is dual to q, then q is dual to p.
 */
function test_mutual_property_duals() {
	const dict: Record<string, string | null> = {}

	const properties = db
		.prepare('SELECT id, dual_property_id FROM category_properties')
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

	console.info(`✅ Properties are mutually dual`)
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
 * Tests if for a specified list of categories all properties have been decided.
 * If this test fails, property assignments or implications are missing.
 */
function test_decided_categories() {
	for (const category_id of decided_categories) {
		test_decided_category(category_id)
	}
}

/**
 * Tests for a given category if all properties have been decided,
 * i.e. are either satisfied or unsatisfied.
 */
function test_decided_category(category_id: string) {
	const res = db
		.prepare(
			`SELECT p.id FROM category_properties p WHERE NOT EXISTS
			(
				SELECT 1 FROM category_property_assignments
				WHERE category_id = ? AND property_id = p.id
			)`,
		)
		.all(category_id) as { id: string }[]

	const unknown_properties = res.map((row) => row.id)

	if (unknown_properties.length > 0) {
		throw new Error(
			`❌ Found unknown properties of ${category_id}:\n${unknown_properties.join(', ')}.\nEvery property needs to be decided for this category.`,
		)
	}

	console.info(`✅ All properties have been decided for ${category_id}`)
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
 * Tests if selected categories behave as expected:
 * All of their properties in the database have to match those in the
 * respective JSON files in the subfolder "expected-data".
 */
function test_properties_of_selected_categories() {
	const expected = {
		Set: Set_expected,
		Ab: Ab_expected,
		Top: Top_expected,
	} as Record<string, Record<string, boolean>>

	for (const cat in expected) {
		test_selected_category(cat, expected[cat])
	}
}

/**
 * Tests if a selected category has the expected properties.
 */
function test_selected_category(category_id: string, expected: Record<string, boolean>) {
	const properties = db
		.prepare(
			`SELECT property_id AS id, is_satisfied
			FROM category_property_assignments
			WHERE category_id = ?`,
		)
		.all(category_id) as { id: string; is_satisfied: number }[]

	for (const { id, is_satisfied } of properties) {
		const ok = Boolean(is_satisfied) === expected[id]
		if (!ok) {
			throw new Error(`❌ Incorrect property of ${category_id}: ${id}`)
		}
	}

	console.info(`✅ Properties of ${category_id} are correct`)
}
