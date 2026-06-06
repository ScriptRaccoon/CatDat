import { StructureType } from './config'

export type ConfigYaml = {
	shared_tags: string[]
	category_tags: string[]
	functor_tags: string[]
	relations: { relation: string; conditional: string }[]
	special_object_types: { type: string; dual: string }[]
	special_morphism_types: { type: string; dual: string }[]
}

export type PropertyEntry = {
	property: string
	proof: string
	check_redundancy?: boolean
}

export type StructureYaml = {
	id: string
	name: string
	notation: string
	description: string | null
	nlab_link: string | null
	tags: string[]
	comments?: string[]
	related: string[]
	satisfied_properties: PropertyEntry[]
	unsatisfied_properties: PropertyEntry[]
	undecidable_properties?: PropertyEntry[]
}

export type CategoryYaml = StructureYaml & {
	objects: string
	morphisms: string
	dual_category?: string
	special_objects: Record<string, { description: string } | undefined>
	special_morphisms: Record<string, { description: string; proof: string } | undefined>
}

export type FunctorYaml = StructureYaml & {
	source: string
	target: string
	left_adjoint?: string
}

export type PropertyYaml = {
	id: string
	relation: string
	description: string
	nlab_link?: string | null
	dual_property?: string | null
	required_target?: string // for functors, TODO: bring back this feature
	invariant_under_equivalences: boolean
	related_properties: string[]
}

export type ImplicationYaml = {
	id: string
	assumptions: string[]
	conclusions: string[]
	mapped_assumptions?: Record<string, string[]>
	proof: string
	is_equivalence: boolean
}

export type ProofWarning = {
	structure: string
	type: string
	property: string
	length: number
}
