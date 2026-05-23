export type Arrayed<T extends readonly unknown[]> = {
	[K in keyof T]: T[K][]
}

type Replace<T, R extends Partial<Record<keyof T, any>>> = Omit<T, keyof R> & R

export type EntityShort = {
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

// used for both categories and functors
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

export type Structure = 'categories' | 'functors'

export type FunctorDB = {
	id: string
	name: string
	source: string
	target: string
	source_name: string
	target_name: string
	description: string
	nlab_link: string | null
}

export type CategoryImplicationDB = {
	id: string
	is_equivalence: 0 | 1
	is_deduced: 0 | 1
	dualized_from: string | null
	reason: string
	assumptions: string
	conclusions: string
}

export type FunctorImplicationDB = {
	id: string
	is_equivalence: 0 | 1
	is_deduced: 0 | 1
	dualized_from: string | null
	reason: string
	assumptions: string
	conclusions: string
	source_assumptions: string
	target_assumptions: string
}

export type FunctorImplicationDisplay = Replace<
	FunctorImplicationDB,
	{
		is_equivalence: boolean
		is_deduced: boolean
		assumptions: string[]
		conclusions: string[]
		source_assumptions: string[]
		target_assumptions: string[]
	}
>

export type CategoryImplicationDisplay = Replace<
	CategoryImplicationDB,
	{
		is_equivalence: boolean
		is_deduced: boolean
		assumptions: string[]
		conclusions: string[]
	}
>
