import type {
	FunctorImplicationDB,
	FunctorImplicationDisplay,
	CategoryImplicationDB,
	CategoryImplicationDisplay,
	PropertyDB,
	PropertyDisplay,
	PropertyAssignmentDB,
	PropertyAssignmentDisplay,
} from '$lib/commons/types'

export function is_object(obj: unknown): obj is Record<string, unknown> {
	return obj != null && obj.constructor.name === 'Object'
}

export function is_subset<T>(a: Set<T>, b: Set<T>) {
	for (const x of a) {
		if (!b.has(x)) return false
	}
	return true
}

export const sleep = (delay: number) => new Promise<void>((res) => setTimeout(res, delay))

// this function is used for both categories and functors
export function display_property(property: PropertyDB): PropertyDisplay {
	return {
		id: property.id,
		relation: property.relation,
		description: property.description,
		dual_property_id: property.dual_property_id,
		nlab_link: property.nlab_link,
		invariant_under_equivalences: Boolean(property.invariant_under_equivalences),
	}
}

export function display_property_assignment(
	property: PropertyAssignmentDB,
): PropertyAssignmentDisplay {
	return {
		id: property.id,
		reason: property.reason,
		is_deduced: Boolean(property.is_deduced),
		relation: property.relation,
	}
}

export function display_implication(
	implication: CategoryImplicationDB,
): CategoryImplicationDisplay {
	return {
		id: implication.id,
		is_equivalence: Boolean(implication.is_equivalence),
		reason: implication.reason,
		is_deduced: Boolean(implication.is_deduced),
		assumptions: JSON.parse(implication.assumptions),
		conclusions: JSON.parse(implication.conclusions),
		dualized_from: implication.dualized_from,
	}
}

export function display_functor_implication(
	implication: FunctorImplicationDB,
): FunctorImplicationDisplay {
	return {
		id: implication.id,
		is_equivalence: Boolean(implication.is_equivalence),
		reason: implication.reason,
		assumptions: JSON.parse(implication.assumptions),
		source_assumptions: JSON.parse(implication.source_assumptions),
		target_assumptions: JSON.parse(implication.target_assumptions),
		conclusions: JSON.parse(implication.conclusions),
		dualized_from: implication.dualized_from,
	}
}
