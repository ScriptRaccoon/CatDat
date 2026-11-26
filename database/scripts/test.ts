/**
 * This file is executed via `pnpm db:test`.
 * It checks that the data behaves as expected.
 * If not, an error is thrown, which must be fixed.
 */

import { devlog } from '#shared/utils.ts'
import { STRUCTURE_TYPES, type StructureType, PLURALS } from '#shared/config.ts'
import test_config from '../test-data/config.json'
import { test_no_redundant_assignments } from './tests/redundant-assignments'
import { test_no_redundant_implications } from './tests/redundant-implications'
import { check_link_targets_exist } from './tests/links'
import { test_history_entries_exist } from './tests/history'
import { test_mutual_structure_duals, test_property_duals } from './tests/duals'
import {
	test_decided_structures,
	test_positivity,
	test_properties_of_selected_structures
} from './tests/properties'
import { test_undecidable_implications } from './tests/undecidable-implications'
import { test_adjoint_functor_relationships } from './tests/adjoint-functors'

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
			const config = TEST_CONFIG[type]

			devlog(`\n--- Test ${PLURALS[type]} ---`)

			test_mutual_structure_duals(type)

			for (const structure_id of config.positive_structures) {
				test_positivity(structure_id, type)
			}

			test_property_duals(type, config.properties_without_dual)
			test_decided_structures(type, config.decided_structures)
			test_properties_of_selected_structures(type)
			test_undecidable_implications(type)
		}

		devlog('\n--- Test adjoint functors ---')
		test_adjoint_functor_relationships()

		devlog('\n--- Test redundancies ---')
		test_no_redundant_implications()
		test_no_redundant_assignments()
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.message)
		} else {
			console.error(err)
		}
		process.exit(1)
	}
}

execute_tests()
