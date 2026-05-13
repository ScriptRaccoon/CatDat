import { get_client } from './utils/helpers'
import {
	get_all_assignments,
	get_categories,
	get_ignored_redundant_properties,
	get_normalized_category_implications,
	type NormalizedCategoryImplication,
} from './utils/categories'
import {
	get_deduced_satisfied_properties,
	get_deduced_unsatisfied_properties,
} from './utils/deduction'

const db = get_client()

check_redundancies()

/**
 * Checks for redundancies in the database.
 */
function check_redundancies() {
	check_redundant_category_property_assignments()
}

/**
 * Checks for redundant (category, property)-assignments and logs
 * one per category if any are found (satisfied or unsatisfied).
 * No error is thrown intentionally.
 */
function check_redundant_category_property_assignments() {
	console.info('\n--- Check redundant category property assignments ---')

	const implications = get_normalized_category_implications(db)
	const categories = get_categories(db)
	const assignments = get_all_assignments(db, categories)
	const ignore_dict = get_ignored_redundant_properties(db)

	const ignore_count = Object.keys(ignore_dict).reduce(
		(count, id) => count + ignore_dict[id].size,
		0,
	)

	let redundancy_count = 0

	for (const category of categories) {
		const redundant_satisfied_property = get_redundant_satisfied_property(
			assignments[category.id].satisfied.non_deduced,
			implications,
			ignore_dict[category.id],
		)

		if (redundant_satisfied_property) {
			console.warn(
				`🟠 Redundant satisfied property for ${category.id}: "${redundant_satisfied_property}" is implied by others.`,
			)

			redundancy_count++
		}

		const all_satisfied_properties = new Set([
			...assignments[category.id].satisfied.non_deduced,
			...assignments[category.id].satisfied.deduced,
		])

		const redundant_unsatisfied_property = get_redundant_unsatisfied_property(
			all_satisfied_properties,
			assignments[category.id].unsatisfied.non_deduced,
			implications,
			ignore_dict[category.id],
		)

		if (redundant_unsatisfied_property) {
			console.warn(
				`🟡 Redundant unsatisfied property for ${category.id}: "${redundant_unsatisfied_property}" is implied by others.`,
			)

			redundancy_count++
		}
	}

	if (redundancy_count === 0) {
		console.info('✅ No redundant assignments found')
	} else {
		console.info(`Found ${redundancy_count} redundant assignments`)
	}

	if (ignore_count > 0) {
		console.info(`${ignore_count} redundant assignments have been ignored`)
	}
}

/**
 * From a given set of properties, returns a property that can be
 * deduced from the other properties in this set, based on a list
 * of normalized implications.
 * If no such property exists, null is returned.
 */
function get_redundant_satisfied_property(
	satisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
	ignored: Set<string> = new Set(),
) {
	for (const p of [...satisfied_properties]) {
		if (ignored.has(p)) continue
		satisfied_properties.delete(p)
		const { deduced_satisfied_properties } = get_deduced_satisfied_properties(
			satisfied_properties,
			implications,
			{ stop_when_found: p },
		)
		if (deduced_satisfied_properties.has(p)) return p
		satisfied_properties.add(p)
	}
	return null
}

/**
 * From a given set of satisfied and unsatisfied properties,
 * returns a unsatisfied property that can be deduced from these,
 * based on a list of normalized implications.
 * If no such property exists, null is returned.
 */
function get_redundant_unsatisfied_property(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
	ignored: Set<string> = new Set(),
) {
	for (const p of [...unsatisfied_properties]) {
		if (ignored.has(p)) continue
		unsatisfied_properties.delete(p)
		const { deduced_unsatisfied_properties } = get_deduced_unsatisfied_properties(
			satisfied_properties,
			unsatisfied_properties,
			implications,
			{ stop_when_found: p },
		)
		if (deduced_unsatisfied_properties.has(p)) return p
		unsatisfied_properties.add(p)
	}
	return null
}
