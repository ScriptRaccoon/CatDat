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
	// ad hoc handling of negation of functor properties
	// such as "preserves coproducts", TODO: improve this
	if (
		property.is_satisfied === 0 &&
		property.id.startsWith('preserves') &&
		!property.relation
	) {
		return {
			id: property.id,
			label: property.id.replace(/^preserves/, 'preserve'),
			reason: property.reason,
			is_deduced: Boolean(property.is_deduced),
			relation: 'does not',
		}
	}
	return {
		id: property.id,
		label: property.id,
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
