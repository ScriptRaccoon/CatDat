export type ConfigYaml = {
	structure_tags: string[]
	category_tags: string[]
	functor_tags: string[]
	morphism_tags: string[]
	category_property_tags: string[]
	functor_property_tags: string[]
	morphism_property_tags: string[]
	relations: {
		relation: string
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

export type PropertyEntry = {
	property: string
	proof: string
	check_redundancy?: boolean
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
	description: string | null
	nlab_link: string | null
	tags: string[]
	related: string[]
	dual?: string
	satisfied_properties: PropertyEntry[]
	unsatisfied_properties: PropertyEntry[]
	undecidable_properties?: PropertyEntry[]
	comments?: string[]
}

export type CategoryYaml = StructureYaml & {
	objects: string
	morphisms: string
	special_objects: Record<string, ObjectEntry | undefined>
	special_morphisms: Record<string, MorphismEntry | undefined>
}

export type FunctorYaml = StructureYaml & {
	source: string
	target: string
	left_adjoint?: string
}

export type MorphismYaml = StructureYaml & {
	category: string
}

export type PropertyYaml = {
	id: string
	relation: string
	description: string
	nlab_link: string | null
	dual_property?: string | null
	invariant_under_equivalences: boolean
	related_properties: string[]
	tags: string[]
}

export type ImplicationYaml = {
	id: string
	assumptions: string[]
	conclusions: string[]
	mapped_assumptions?: Partial<Record<string, string[]>>
	proof: string
	is_equivalence: boolean
}
