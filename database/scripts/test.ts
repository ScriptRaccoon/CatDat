/**
 * This file is executed via `pnpm db:test`.
 * It checks that the data behaves as expected.
 * If not, an error is thrown, which must be fixed.
 */

import { history } from '#shared/history.ts'
import { capitalize, devlog, remove_underscores } from '#shared/utils.ts'
import { get_client } from '#shared/db.ts'
import { STRUCTURE_TYPES, type StructureType, PLURALS } from '#shared/config.ts'
import fs from 'node:fs'
import path from 'node:path'
import {
	decode_property_ID,
	get_special_morphism_plural
} from '#shared/property.utils.ts'
import { test_no_redundant_assignments } from './utils/redundant-assignments'
import { test_no_redundant_implications } from './utils/redundant-implications'
import test_config from '../test-data/config.json'
import { get_expected_data_folder } from './utils/folders'

const db = get_client({ readonly: true })

/**
 * Test configuration for a structure type, see database/test-data/config.json.
 */
type TestConfig = {
	/** Structures that must satisfy every property (positivity). */
	positive_structures: string[]
	/**
	 * Structures for which every property must be decided.
	 * A new property must be decided at least for these structures.
	 */
	decided_structures: string[]
	/** Properties that have no dual. Every other property must have one. */
	properties_without_dual: string[]
}

const TEST_CONFIG: Record<StructureType, TestConfig> = test_config

execute_tests()

/**
 * The main test function verifying that the data behaves as expected.
 */
function execute_tests() {
	try {
		console.info('--- Database Tests ---')

		devlog('\n--- Test link targets ---')
		check_link_targets_exist()

		devlog('\n--- Test history ---')
		test_history_entries_exist()

		for (const type of STRUCTURE_TYPES) {
			test_structure_type(type)
		}

		devlog('\n--- Test adjoint functors ---')
		test_adjoint_functor_relationships()

		devlog('\n--- Test redundancies ---')
		test_no_redundant_implications(db)
		test_no_redundant_assignments(db)
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
 * Runs all tests that apply to every structure type.
 */
function test_structure_type(type: StructureType) {
	const config = TEST_CONFIG[type]

	devlog(`\n--- Test ${PLURALS[type]} ---`)

	test_mutual_structure_duals(type)

	for (const structure_id of config.positive_structures) {
		test_positivity(structure_id, type)
	}

	test_property_duals(type, config.properties_without_dual)
	test_decided_structures(type, config.decided_structures)
	test_properties_of_selected_structures(type)
}

/**
 * Tests for all structures of a given type C,D that if
 * C is dual to D, then D is dual to C.
 */
function test_mutual_structure_duals(type: StructureType) {
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
	}

	devlog(`✅ ${capitalize(PLURALS[type])} are mutually dual`)
}

/**
 * Tests that a specified structure has no unsatisfied property.
 * This enforces that all properties in the database are "positive".
 */
function test_positivity(structure_id: string, type: StructureType) {
	const unsatisfied_props = db
		.prepare<[StructureType, string], string>(
			`SELECT property_id FROM property_assignments
			WHERE type = ? AND structure_id = ? AND is_satisfied = FALSE`
		)
		.pluck()
		.all(type, structure_id)

	if (unsatisfied_props.length > 0) {
		throw new Error(
			`❌ The ${remove_underscores(type)} ${structure_id} has ${unsatisfied_props.length} unsatisfied properties, but it should have 0.`
		)
	}

	devlog(
		`✅ The ${remove_underscores(type)} ${structure_id} has no unsatisfied properties`
	)
}

/**
 * Tests that every property of a given type has a dual
 * (except the specified exceptions), and that
 * for all properties p,q, if p is dual to q, then q is dual to p.
 */
function test_property_duals(type: StructureType, exceptions: string[]) {
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

/**
 * Tests that every entry in the history refers to an existing structure or property,
 * and that the history has as many entries as there are structures and properties.
 * If this test fails, a structure or property has probably been renamed or deleted.
 */
function test_history_entries_exist() {
	for (const kind of ['structures', 'properties'] as const) {
		const keys = new Set(
			db
				.prepare<never[], string>(`SELECT type || '/' || id FROM ${kind}`)
				.pluck()
				.all()
		)

		const unknown_entries = history[kind].filter(
			({ type, id }) => !keys.has(`${type}/${id}`)
		)

		if (unknown_entries.length > 0) {
			throw new Error(
				`❌ Found unknown ${kind} in history.json:\n${unknown_entries.map(({ type, id }) => `${id} (${type})`).join(', ')}`
			)
		}

		if (history[kind].length !== keys.size) {
			throw new Error(
				`❌ The history has ${history[kind].length} ${kind}, but the database has ${keys.size}.`
			)
		}
	}

	devlog('✅ All entries in the history exist, and their number is correct')
}

/**
 * Tests that for a specified list of structures all properties have
 * been decided. If this test fails, property assignments or implications are missing.
 */
function test_decided_structures(type: StructureType, structure_ids: string[]) {
	const unknown_query = db
		.prepare<[StructureType, StructureType, string], string>(
			`SELECT p.id FROM properties p WHERE type = ? AND NOT EXISTS
			(
				SELECT 1 FROM property_assignments
				WHERE type = ? AND structure_id = ? AND property_id = p.id
			)`
		)
		.pluck()

	for (const structure_id of structure_ids) {
		const unknown_properties = unknown_query.all(type, type, structure_id)

		if (unknown_properties.length > 0) {
			throw new Error(
				`❌ Found unknown properties of ${structure_id}:\n${unknown_properties.join(', ')}.\nEvery property needs to be decided for this ${remove_underscores(type)}.`
			)
		}

		devlog(`✅ All properties have been decided for ${structure_id}`)
	}
}

/**
 * Tests if selected structures behave as expected:
 * All of their properties in the database have to match those in the
 * respective JSON files in database/test-data/expected.
 * We exclude undecidable properties here.
 */
function test_properties_of_selected_structures(type: StructureType) {
	const structure_query = db
		.prepare<[StructureType, string], string>(
			`SELECT id FROM structures WHERE type = ? AND id = ?`
		)
		.pluck()

	const property_query = db.prepare<
		[StructureType, string],
		{ property_id: string; is_satisfied: 0 | 1 }
	>(
		`SELECT property_id, is_satisfied FROM property_assignments
		WHERE type = ? AND structure_id = ? AND is_satisfied IS NOT NULL`
	)

	const folder = get_expected_data_folder(type)
	const files = fs.readdirSync(folder).filter((file) => file.endsWith('.json'))

	for (const file of files) {
		const structure_id = path.basename(file, '.json')

		if (!structure_query.get(type, structure_id)) {
			throw new Error(
				`❌ Found expected properties of unknown ${remove_underscores(type)}: ${structure_id}`
			)
		}

		const content = fs.readFileSync(path.join(folder, file), 'utf8')
		const expected = JSON.parse(content) as {
			satisfied: string[]
			unsatisfied: string[]
		}
		const properties = property_query.all(type, structure_id)
		const satisfied = new Set(expected.satisfied)
		const unsatisfied = new Set(expected.unsatisfied)

		for (const { property_id, is_satisfied } of properties) {
			const ok = is_satisfied
				? satisfied.has(property_id)
				: unsatisfied.has(property_id)
			if (ok) continue
			throw new Error(`❌ Incorrect property of ${structure_id}: ${property_id}`)
		}

		devlog(`✅ Properties of ${structure_id} are correct`)
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
			.map((file) => path.basename(file, '.md'))
	)

	const proofs: { proof: string; error_prefix: string }[] = [
		...db

			.prepare<never[], { structure: string; property: string; proof: string }>(
				`SELECT
					structure_id AS structure,
					property_id AS property,
					proof
				FROM property_assignments`
			)
			.all()
			.map((x) => ({
				proof: x.proof,
				error_prefix: `❌ The proof of (${x.structure}, ${x.property})`
			})),
		...db
			.prepare<never[], { id: string; proof: string }>(
				`SELECT id, proof FROM implications`
			)
			.all()
			.map((x) => ({
				proof: x.proof,
				error_prefix: `❌ The proof of the implication (${x.id})`
			})),
		...db
			.prepare<never[], { category: string; kind: string; proof: string }>(
				`SELECT
					category_id AS category,
					kind,
					proof
				FROM special_morphism_assignments
				WHERE is_deduced = FALSE`
			)
			.all()
			.map((x) => ({
				proof: x.proof,
				error_prefix: `❌ The proof describing the ${get_special_morphism_plural(x.kind)} in ${x.category}`
			}))
	]

	for (const { proof, error_prefix } of proofs) {
		const link_regex = new RegExp(
			`<a\\s+href="\\/(${STRUCTURE_TYPES.join('|')})(?:-(implication|property))?\\/([^"]+)"`,
			'g'
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
				.prepare<[string, string], string>(
					`SELECT id FROM ${sort} WHERE id = ? AND type = ?`
				)
				.get(decoded_id, type)

			if (!exists) {
				throw new Error(
					`${error_prefix} has a link to "${id}" which does not exist:\n"${proof}"`
				)
			}
		}

		const content_link_regex = /<a\s+href="\/content\/([^"]+)"/g

		for (const match of proof.matchAll(content_link_regex)) {
			const id = match[1]

			if (!content_ids.has(id)) {
				throw new Error(
					`${error_prefix} has a link to "${id}" which does not exist:\n"${proof}"`
				)
			}
		}
	}

	devlog(`✅ Link targets exist`)
}

/**
 * Tests for functors that if L is left adjoint to R,
 * then R is right adjoint to L, and vice versa.
 * Also tests dom(L)=cod(R) and cod(L)=dom(R).
 */
function test_adjoint_functor_relationships() {
	const checks: Array<{
		query: string
		format: (row: Record<string, string | null>) => string
	}> = [
		{
			query: `
			SELECT
				ass1.source_structure_id AS right_1,
				ass1.target_structure_id AS left,
				ass2.target_structure_id AS right_2
			FROM associated_structures ass1
			LEFT JOIN associated_structures ass2
			ON
				ass2.source_type = 'functor'
				AND ass2.label = 'right_adjoint'
				AND ass2.source_structure_id = ass1.target_structure_id
			WHERE
				ass1.source_type = 'functor'
				AND ass1.label = 'left_adjoint'
				AND (right_2 IS NULL OR right_2 <> right_1)
			`,
			format: ({ right_1, left, right_2 }) =>
				`❌ Adjoint asymmetry: ${left} is declared as left adjoint to ${right_1}, but ${right_2 ?? 'no functor'} is recorded as its right adjoint.`
		},
		{
			query: `
			SELECT
				ass1.source_structure_id AS left_1,
				ass1.target_structure_id AS right,
				ass2.target_structure_id AS left_2
			FROM associated_structures ass1
			LEFT JOIN associated_structures ass2
			ON
				ass2.source_type = 'functor'
				AND ass2.label = 'left_adjoint'
				AND ass2.source_structure_id = ass1.target_structure_id
			WHERE
				ass1.source_type = 'functor'
				AND ass1.label = 'right_adjoint'
				AND (left_2 IS NULL OR left_2 <> left_1)
			`,
			format: ({ left_1, right, left_2 }) =>
				`❌ Adjoint asymmetry: ${right} is declared as right adjoint to ${left_1}, but ${left_2 ?? 'no functor'} is recorded as its left adjoint.`
		},
		{
			query: `
			SELECT
				ass.source_structure_id AS functor,
				ass.target_structure_id AS left_adjoint,
				dom.target_structure_id AS functor_domain,
				adj_cod.target_structure_id AS left_adjoint_codomain
			FROM
				associated_structures ass
			INNER JOIN associated_structures dom
			ON
				dom.label = 'domain'
				AND dom.source_type = 'functor'
				AND dom.source_structure_id = ass.source_structure_id
			INNER JOIN associated_structures adj_cod
			ON
				adj_cod.label = 'codomain'
				AND adj_cod.source_type = 'functor'
				AND adj_cod.source_structure_id = ass.target_structure_id
			WHERE
				ass.label = 'left_adjoint'
				AND functor_domain <> left_adjoint_codomain
			`,
			format: ({ functor, left_adjoint, functor_domain, left_adjoint_codomain }) =>
				`❌ Domain/codomain mismatch: ${functor} has domain ${functor_domain}, but its left adjoint ${left_adjoint} has codomain ${left_adjoint_codomain}.`
		},
		{
			query: `
			SELECT
				ass.source_structure_id AS functor,
				ass.target_structure_id AS left_adjoint,
				cod.target_structure_id AS functor_codomain,
				adj_dom.target_structure_id AS left_adjoint_domain
			FROM
				associated_structures ass
			INNER JOIN associated_structures cod
			ON
				cod.label = 'codomain'
				AND cod.source_type = 'functor'
				AND cod.source_structure_id = ass.source_structure_id
			INNER JOIN associated_structures adj_dom
			ON
				adj_dom.label = 'domain'
				AND adj_dom.source_type = 'functor'
				AND adj_dom.source_structure_id = ass.target_structure_id
			WHERE
				ass.label = 'left_adjoint'
				AND functor_codomain <> left_adjoint_domain`,
			format: ({ functor, left_adjoint, functor_codomain, left_adjoint_domain }) =>
				`❌ Domain/codomain mismatch: ${functor} has codomain ${functor_codomain}, but its left adjoint ${left_adjoint} has domain ${left_adjoint_domain}.`
		}
	]

	const violations = checks.flatMap(({ query, format }) =>
		db
			.prepare<never[], Record<string, string | null>>(query)
			.all()
			.map((row) => format(row))
	)

	if (violations.length > 0) {
		throw new Error(violations.join('\n'))
	}

	devlog('✅ Adjoint functor relationships are valid')
}
