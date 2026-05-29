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

const relation_negations: Record<string, string> = {
	'is': 'is not',
	'is a': 'is not a',
	'is an': 'is not an',
	'has': 'does not have',
	'has a': 'does not have a',
	'has an': 'does not have an',
	'satisfies': 'does not satisfy',
	'': '',
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
			proof: property.proof,
			is_deduced: Boolean(property.is_deduced),
			relation: 'does not',
		}
	}

	if (property.is_satisfied === 0) {
		property.relation = relation_negations[property.relation]
	}

	return {
		id: property.id,
		label: property.id,
		proof: property.proof,
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
		proof: implication.proof,
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
