export type Arrayed<T extends readonly unknown[]> = {
	[K in keyof T]: T[K][]
}

type Replace<T, R extends Partial<Record<keyof T, any>>> = Omit<T, keyof R> & R

export type StructureType = 'category' | 'functor'

export type StructureShort = {
	id: string
	name: string
}

export type CategoryDisplay = {
	id: string
	name: string
	notation: string
	objects: string
	morphisms: string
	description: string | null
	nlab_link: string | null
	dual_category_id: string | null
	dual_category_name: string | null
	dual_category_notation: string | null
}

export type RelatedCategory = Pick<CategoryDisplay, 'id' | 'name' | 'notation'>

export type TagObject = { tag: string }

export type CommentObject = { id: number; comment: string }

export type PropertyDB = {
	id: string
	relation: string
	description: string
	dual_property_id: string | null
	nlab_link: string | null
	invariant_under_equivalences: 0 | 1
}

export type PropertyDisplay = Replace<
	PropertyDB,
	{ invariant_under_equivalences: boolean }
>

export type PropertyShort = Pick<PropertyDB, 'id' | 'relation'>

export type PropertyAssignmentDB = {
	id: string
	reason: string
	relation: string
	is_deduced: 0 | 1
	is_satisfied: 0 | 1 | null
}

export type PropertyAssignmentDisplay = {
	id: string
	reason: string
	relation: string
	is_deduced: boolean
}

export type SpecialObject = {
	type: string
	description: string
}

export type SpecialMorphism = {
	type: string
	description: string | null
	reason: string
}

export type FunctorDisplay = {
	id: string
	name: string
	source: string
	target: string
	source_name: string
	target_name: string
	description: string
	nlab_link: string | null
}

export type ImplicationDB = {
	id: string
	is_equivalence: 0 | 1
	is_deduced: 0 | 1
	dualized_from: string | null
	reason: string
	assumptions: string
	conclusions: string
	source_assumptions?: string // for functors
	target_assumptions?: string // for functors
}

export type ImplicationDisplay = Replace<
	ImplicationDB,
	{
		is_equivalence: boolean
		is_deduced: boolean
		assumptions: string[]
		conclusions: string[]
		source_assumptions?: string[]
		target_assumptions?: string[]
	}
>

export type SearchResults = {
	type: StructureType
	contradiction: string[] | null
	satisfied_properties: string[]
	unsatisfied_properties: string[]
	dual_satisfied_properties: (string | null)[]
	dual_unsatisfied_properties: (string | null)[]
	dual_search_available: boolean
	found_structures: StructureShort[]
}
