export type ConfigYaml = {
	structure_tags: string[]
	category_tags: string[]
	functor_tags: string[]
	morphism_tags: string[]
	symmetric_monoidal_category_tags: string[]
	category_property_tags: string[]
	functor_property_tags: string[]
	morphism_property_tags: string[]
	symmetric_monoidal_category_property_tags: string[]
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

export type SpecialMorphismRuleYaml = {
	property: string
	type: string
	description: string
	proof: string
}

type PropertyEntry = {
	property: string
	proof: string
	check_redundancy?: boolean
	label?: string
	references?: string[]
}

type ObjectEntry = {
	description: string
}

type MorphismEntry = {
	description: string
	proof: string
}

export type StructureYaml = {
	id: string
	name: string
	notation: string
	description: string
	nlab_link: string | null
	tags: string[]
	related: string[]
	dual?: string
	parent?: string
	satisfied_properties: PropertyEntry[]
	unsatisfied_properties: PropertyEntry[]
	undecidable_properties?: PropertyEntry[]
	comments?: string[]
}

export type CategoryYaml = StructureYaml & {
	objects: string
	morphisms: string
	special_objects: Record<string, ObjectEntry>
	special_morphisms: Record<string, MorphismEntry>
}

export type PropertyYaml = {
	id: string
	relation: string
	description: string
	nlab_link: string | null
	dual: string | null
	invariant_under_equivalences: boolean
	related: string[]
	tags: string[]
}

export type ImplicationYaml = {
	id: string
	assumptions: string[]
	conclusions: string[]
	associated_assumptions?: Partial<Record<string, string[]>>
	proof: string
	is_equivalence: boolean
}
