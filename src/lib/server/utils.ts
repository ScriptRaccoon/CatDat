import type {
	FunctorImplicationDB,
	FunctorImplicationDisplay,
	FunctorProperty,
	FunctorPropertyDB,
	ImplicationDB,
	ImplicationDisplay,
	PropertyDB,
	PropertyDisplay,
} from '$lib/commons/types'

export function is_object(obj: unknown): obj is Record<string, unknown> {
	return obj != null && obj.constructor.name === 'Object'
}

export const sleep = (delay: number) => new Promise<void>((res) => setTimeout(res, delay))

export function display_implication(implication: ImplicationDB): ImplicationDisplay {
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

export function to_placeholders(arr: string[]): string {
	return arr.map(() => '?').join(', ')
}

export function display_functor_property(property: FunctorPropertyDB): FunctorProperty {
	return {
		id: property.id,
		relation: property.relation,
		description: property.description,
		dual_property_id: property.dual_property_id,
		nlab_link: property.nlab_link,
		invariant_under_equivalences: Boolean(property.invariant_under_equivalences),
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
