export type ConfigYaml = {
	tags: string[]
	relations: {
		relation: string
		negation: string
		conditional: string
	}[]
	special_object_types: {
		type: string
		dual: string
	}[]
	special_morphism_types: {
		type: string
		dual: string
	}[]
}

export type CategoryYaml = {
	id: string
	name: string
	notation: string
	objects: string
	morphisms: string
	description: string | null
	nlab_link: string | null
	dual_category?: string | null
	tags: string[]
	related_categories: string[]
	satisfied_properties: PropertyEntry[]
	unsatisfied_properties: PropertyEntry[]
	undecidable_properties?: PropertyEntry[]
	special_objects: Record<string, ObjectEntry | undefined>
	special_morphisms: Record<string, MorphismEntry | undefined>
	comments?: string[]
}

type PropertyEntry = {
	property: string
	reason: string
	check_redundancy?: boolean
}

type ObjectEntry = {
	description: string
}

type MorphismEntry = {
	description: string
	reason: string
}

export type CategoryPropertyYaml = {
	id: string
	relation: string
	description: string
	nlab_link?: string | null
	dual_property?: string | null
	invariant_under_equivalences: boolean
	related_properties: string[]
}

export type CategoryImplicationYaml = {
	id: string
	assumptions: string[]
	conclusions: string[]
	reason: string
	is_equivalence: boolean
}

export type FunctorImplicationYaml = {
	id: string
	assumptions: string[]
	source_assumptions: string[]
	target_assumptions: string[]
	conclusions: string[]
	reason: string
	is_equivalence: boolean
}

export type FunctorPropertyYaml = {
	id: string
	relation: string
	description: string
	nlab_link?: string | null
	dual_property?: string | null
	invariant_under_equivalences: boolean
}

export type FunctorYaml = {
	id: string
	name: string
	source: string
	target: string
	description?: string | null
	nlab_link?: string
	tags: string[]
	related_functors: string[]
	satisfied_properties: PropertyEntry[]
	unsatisfied_properties: PropertyEntry[]
	undecidable_properties?: PropertyEntry[]
	comments?: string[]
}
