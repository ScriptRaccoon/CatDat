import { get_client, is_subset } from './shared'
import {
	get_all_assignments,
	get_categories,
	get_normalized_category_implications,
	NormalizedCategoryImplication,
} from './categories.utils'

const db = get_client()

check_redundancies()

function check_redundancies() {
	check_redundant_category_property_assignments()
}

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
				`🟠 Redundant assignment for ${category.id}: "${redundant_satisfied_property}" is deducible from other satisfied properties.`,
			)

			redundancy_count++
		}

		const redundant_unsatisfied_property = get_redundant_unsatisfied_property(
			new Set([
				...assignments[category.id].satisfied.non_deduced,
				...assignments[category.id].satisfied.deduced,
			]),
			assignments[category.id].unsatisfied.non_deduced,
			implications,
		)

		if (redundant_unsatisfied_property) {
			console.warn(
				`🟡 Redundant assignment for ${category.id}: "${redundant_unsatisfied_property}" is deducible from other unsatisfied properties.`,
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

function get_redundant_satisfied_property(
	satisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
) {
	for (const p of satisfied_properties) {
		const copy = new Set(satisfied_properties)
		copy.delete(p)
		const deduced_properties = get_deduced_satisfied_properties(copy, implications, {
			stop_when_found: p,
		})
		if (deduced_properties.has(p)) return p
	}
	return null
}

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

function get_redundant_unsatisfied_property(
	satisfied_properties: Set<string>,
	unsatisfied_properties: Set<string>,
	implications: NormalizedCategoryImplication[],
) {
	for (const p of unsatisfied_properties) {
		const copy = new Set(unsatisfied_properties)
		copy.delete(p)
		const deduced_properties = get_deduced_unsatisfied_properties(
			satisfied_properties,
			copy,
			implications,
			{ stop_when_found: p },
		)
		if (deduced_properties.has(p)) return p
	}
	return null
}
