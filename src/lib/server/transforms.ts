import type {
	PropertyDB,
	PropertyDisplay,
	PropertyAssignmentDB,
	PropertyAssignmentDisplay,
	ImplicationDB,
	ImplicationDisplay,
} from '$lib/commons/types'

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

export function display_implication(implication: ImplicationDB): ImplicationDisplay {
	return {
		id: implication.id,
		is_equivalence: Boolean(implication.is_equivalence),
		is_deduced: Boolean(implication.is_deduced),
		dualized_from: implication.dualized_from,
		reason: implication.reason,
		assumptions: JSON.parse(implication.assumptions),
		source_assumptions: implication.source_assumptions
			? JSON.parse(implication.source_assumptions)
			: undefined,
		target_assumptions: implication.target_assumptions
			? JSON.parse(implication.target_assumptions)
			: undefined,
		conclusions: JSON.parse(implication.conclusions),
	}
}
