import { get_client, is_subset } from './shared'
import {
	get_all_assignments,
	get_categories,
	get_normalized_category_implications,
	NormalizedCategoryImplication,
} from './categories.utils'

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

	let redundancy_count = 0

	for (const category of categories) {
		const redundant_satisfied_property = get_redundant_satisfied_property(
			assignments[category.id].satisfied.non_deduced,
			implications,
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
}

/**
 * Returns the set of properties that can be deduced from a set of properties
 * based on a list of normalized implications. This function is very similar
 * to the corresponding function in `deduce-category-properties.ts`.
 */
function get_deduced_satisfied_properties(
	satisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
	options?: { stop_when_found: string },
) {
	const deduced_properties = new Set(satisfied_properties)

	while (true) {
		const implication = implications.find(
			({ assumptions, conclusion }) =>
				is_subset(assumptions, deduced_properties) &&
				!deduced_properties.has(conclusion),
		)
		if (!implication) break

		deduced_properties.add(implication.conclusion)

		if (options?.stop_when_found === implication.conclusion) {
			return deduced_properties
		}
	}

	return deduced_properties
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
) {
	for (const p of [...satisfied_properties]) {
		satisfied_properties.delete(p)
		const deduced_properties = get_deduced_satisfied_properties(
			satisfied_properties,
			implications,
			{ stop_when_found: p },
		)
		if (deduced_properties.has(p)) return p
		satisfied_properties.add(p)
	}
	return null
}

/**
 * Returns the set of unsatisfied properties that can be deduced from
 * a set of satisfied properties and a set of unsatisfied properties,
 * based on a list of normalized implications. This function is very similar
 * to the corresponding function in `deduce-category-properties.ts`.
 */
function get_deduced_unsatisfied_properties(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
	options?: { stop_when_found: string },
) {
	const deduced_unsatisfied_properties = new Set(unsatisfied_properties)

	function get_next_implication() {
		for (const implication of implications) {
			if (!deduced_unsatisfied_properties.has(implication.conclusion)) continue
			for (const p of implication.assumptions) {
				const is_valid =
					!deduced_unsatisfied_properties.has(p) &&
					is_subset(implication.assumptions, satisfied_properties, p)
				if (is_valid) return { implication, property: p }
			}
		}

		return null
	}

	while (true) {
		const next = get_next_implication()
		if (!next) break

		const { property } = next

		deduced_unsatisfied_properties.add(property)

		if (options?.stop_when_found === property) {
			return deduced_unsatisfied_properties
		}
	}

	return deduced_unsatisfied_properties
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
) {
	for (const p of [...unsatisfied_properties]) {
		unsatisfied_properties.delete(p)
		const deduced_properties = get_deduced_unsatisfied_properties(
			satisfied_properties,
			unsatisfied_properties,
			implications,
			{ stop_when_found: p },
		)
		if (deduced_properties.has(p)) return p
		unsatisfied_properties.add(p)
	}
	return null
}
