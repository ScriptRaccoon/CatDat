import { db } from './db'
import { type StructureType } from '#shared/config.ts'
import { devlog, remove_underscores } from '#shared/utils.ts'
import fs from 'node:fs'
import path from 'node:path'
import { get_expected_data_folder } from '../utils/folders'

/**
 * Tests that a specified structure has no unsatisfied property.
 * This enforces that all properties in the database are "positive".
 */
export function test_positivity(structure_id: string, type: StructureType) {
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
 * Tests that for a specified list of structures all properties have
 * been decided. If this test fails, property assignments or implications are missing.
 */
export function test_decided_structures(type: StructureType, structure_ids: string[]) {
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
export function test_properties_of_selected_structures(type: StructureType) {
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
		const expected_satisfied = new Set(expected.satisfied)
		const expected_unsatisfied = new Set(expected.unsatisfied)
		const actual = property_query.all(type, structure_id)

		for (const { property_id, is_satisfied } of actual) {
			const ok = is_satisfied
				? expected_satisfied.has(property_id)
				: expected_unsatisfied.has(property_id)
			if (ok) continue
			throw new Error(`❌ Incorrect property of ${structure_id}: ${property_id}`)
		}

		devlog(`✅ Properties of ${structure_id} are correct`)
	}
}
