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
import decided_morphisms from './expected-data/decided-morphisms.json'
import { capitalize } from './utils/helpers'
import { get_client } from './utils/db'
import { PLURALS, STRUCTURES, type StructureType } from './config'
import fs from 'node:fs'
import path from 'node:path'
import { decode_property_ID } from '../../../src/lib/commons/property.url'

const db = get_client()

execute_tests()

/**
 * The main test function verifying that the data behaves as expected.
 */
function execute_tests() {
	try {
		console.info('--- Test link targets ---')
		check_link_targets_exist()

		console.info('\n--- Test categories ---')

		test_mutual_structure_duals('category')
		test_positivity('1', 'category')
		test_mutual_property_duals('category')
		test_decided_structures(decided_categories, 'category')
		test_properties_of_selected_structures(
			{ Set: Set_expected, Ab: Ab_expected, Top: Top_expected },
			'category',
		)

		console.info('\n--- Test functors ---')

		test_positivity('id_Set', 'functor')
		test_mutual_property_duals('functor')
		test_decided_structures(decided_functors, 'functor')
		test_properties_of_selected_structures(
			{ forget_vector: forget_vector_expected, id_Set: id_Set_expected },
			'functor',
		)

		console.info('\n--- Test morphisms ---')

		test_positivity('id_X', 'morphism')
		test_decided_structures(decided_morphisms, 'morphism')
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
 * Tests for all structures of a given type C,D that if
 * C is dual to D, then D is dual to C.
 */
function test_mutual_structure_duals(type: StructureType) {
	const dict: Record<string, string | null> = {}

	const structures_with_duals = db
		.prepare<[StructureType], { id: string; dual: string | null }>(
			`SELECT id, dual_structure_id AS dual
			FROM structures WHERE type = ?`,
		)
		.all(type)

	for (const { id, dual } of structures_with_duals) {
		dict[id] = dual
	}

	for (const id in dict) {
		const dual = dict[id]
		if (dual && dict[dual] !== id) {
			throw new Error(`❌ Found non-mutual ${type} duality: ${id}, ${dual}`)
		}
	}

	console.info(`✅ ${capitalize(PLURALS[type])} are mutually dual`)
}

/**
 * Tests that a specified structure has no unsatisfied property.
 * This enforces that all properties in the database are "positive".
 */
function test_positivity(structure_id: string, type: StructureType) {
	const unsatisfied_props = db
		.prepare<[StructureType, string], string>(
			`SELECT property_id FROM property_assignments
			WHERE type = ? AND structure_id = ? AND is_satisfied = FALSE`,
		)
		.pluck()
		.all(type, structure_id)

	if (unsatisfied_props.length > 0) {
		throw new Error(
			`❌ The ${type} ${structure_id} has ${unsatisfied_props.length} unsatisfied properties, but it should have 0.`,
		)
	}

	console.info(`✅ The ${type} ${structure_id} has no unsatisfied properties`)
}

/**
 * Tests for all properties p,q of categories or functors that
 * if p is dual to q, then q is dual to p.
 */
function test_mutual_property_duals(type: StructureType) {
	const dict: Record<string, string | null> = {}

	const properties = db
		.prepare<
			[StructureType],
			{ id: string; dual_property_id: string | null }
		>(`SELECT id, dual_property_id FROM properties WHERE type = ?`)
		.all(type)

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
	const unknown_query = db
		.prepare<[StructureType, StructureType, string], string>(
			`SELECT p.id FROM properties p WHERE type = ? AND NOT EXISTS
			(
				SELECT 1 FROM property_assignments
				WHERE type = ? AND structure_id = ? AND property_id = p.id
			)`,
		)
		.pluck()

	for (const structure_id of structure_ids) {
		const unknown_properties = unknown_query.all(type, type, structure_id)

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
	const property_query = db.prepare<
		[StructureType, string],
		{ property_id: string; is_satisfied: 0 | 1 }
	>(
		`SELECT property_id, is_satisfied FROM property_assignments
		WHERE type = ? AND structure_id = ? AND is_satisfied IS NOT NULL`,
	)

	for (const structure_id in expected) {
		const properties = property_query.all(type, structure_id)

		for (const { property_id, is_satisfied } of properties) {
			const ok = Boolean(is_satisfied) === expected[structure_id][property_id]
			if (ok) continue
			throw new Error(`❌ Incorrect property of ${structure_id}: ${property_id}`)
		}

		console.info(`✅ Properties of ${structure_id} are correct`)
	}
}

/**
 * Checks if all links in proofs refer to existing entries.
 */
function check_link_targets_exist() {
	const content_ids = new Set(
		fs
			.readdirSync(path.resolve('content'))
			.filter((file) => file.endsWith('.md'))
			.map((file) => path.basename(file, '.md')),
	)

	const proofs: { proof: string; error_prefix: string }[] = [
		...db

			.prepare<never[], { structure: string; property: string; proof: string }>(
				`SELECT
					structure_id AS structure,
					property_id AS property,
					proof
				FROM property_assignments`,
			)
			.all()
			.map((x) => ({
				proof: x.proof,
				error_prefix: `❌ The proof of (${x.structure}, ${x.property})`,
			})),
		...db
			.prepare<never[], { id: string; proof: string }>(
				`SELECT id, proof FROM implications`,
			)
			.all()
			.map((x) => ({
				proof: x.proof,
				error_prefix: `❌ The proof of the implication (${x.id})`,
			})),
	]

	for (const { proof, error_prefix } of proofs) {
		const link_regex = new RegExp(
			`<a\\s+href="\\/(${STRUCTURES.join('|')})(?:-(implication|property))?\\/([^"]+)"`,
			'g',
		)

		for (const match of proof.matchAll(link_regex)) {
			const type = match[1]
			const id = match[3]
			const sort =
				match[2] === 'implication'
					? 'implications'
					: match[2] === 'property'
						? 'properties'
						: 'structures'

			const decoded_id = sort === 'properties' ? decode_property_ID(id) : id

			const exists = db
				.prepare<
					[string, string],
					string
				>(`SELECT id FROM ${sort} WHERE id = ? AND type = ?`)
				.get(decoded_id, type)

			if (!exists) {
				throw new Error(
					`${error_prefix} has a link to "${id}" which does not exist:\n"${proof}"`,
				)
			}
		}

		const content_link_regex = /<a\s+href="\/content\/([^"]+)"/g

		for (const match of proof.matchAll(content_link_regex)) {
			const id = match[1]

			if (!content_ids.has(id)) {
				throw new Error(
					`${error_prefix} has a link to "${id}" which does not exist:\n"${proof}"`,
				)
			}
		}
	}

	console.info(`✅ Link targets exist`)
}
