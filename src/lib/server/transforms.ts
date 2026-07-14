import type {
	PropertyDB,
	PropertyDisplay,
	PropertyAssignmentDB,
	PropertyAssignmentDisplay,
	ImplicationDB,
	ImplicationDisplay
} from '$lib/commons/types'
import { parse_nested_json_set } from '$shared/utils'

export function display_property(property: PropertyDB): PropertyDisplay {
	return {
		id: property.id,
		relation: property.relation,
		description: property.description,
		dual_property_id: property.dual_property_id,
		nlab_link: property.nlab_link,
		invariant_under_equivalences: Boolean(property.invariant_under_equivalences)
	}
}

export function display_property_assignment(
	property: PropertyAssignmentDB
): PropertyAssignmentDisplay {
	return {
		id: property.id,
		proof: property.proof,
		is_deduced: Boolean(property.is_deduced),
		relation: property.relation
	}
}

export function display_implication(implication: ImplicationDB): ImplicationDisplay {
	return {
		id: implication.id,
		is_equivalence: Boolean(implication.is_equivalence),
		is_deduced: Boolean(implication.is_deduced),
		proof: implication.proof,
		assumptions: JSON.parse(implication.assumptions),
		conclusions: JSON.parse(implication.conclusions),
		mapped_assumptions: parse_nested_json_set(implication.mapped_assumptions)
	}
}
