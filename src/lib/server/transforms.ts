import type {
	PropertyDB,
	PropertyDisplay,
	PropertyAssignmentDB,
	PropertyAssignmentDisplay,
	ImplicationDB,
	ImplicationDisplay,
	StructureDetails
} from '$lib/commons/types'
import { add_math, parse_nested_json_set, strip_math } from '$shared/utils'

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

export function adjust_functor_notation(functor: StructureDetails) {
	const domain = functor.associated_structures.find((s) => s.label == 'domain')
	const codomain = functor.associated_structures.find((s) => s.label == 'codomain')
	if (!domain || !codomain) return

	functor.structure.notation = add_math(
		`${strip_math(functor.structure.notation)}: ${strip_math(domain.notation)} \\to ${strip_math(codomain.notation)}`
	)
}
