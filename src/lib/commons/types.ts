import type { StructureType } from './structures'

export type { StructureType }

export type Arrayed<T extends readonly unknown[]> = {
	[K in keyof T]: T[K][]
}

type Replace<T, R extends Partial<Record<keyof T, any>>> = Omit<T, keyof R> & R

export type StructureShort = {
	id: string
	name: string
}

export type RelatedStructure = StructureShort & { notation: string }

export type StructureDisplay = {
	id: string
	name: string
	notation: string
	description: string | null
	nlab_link: string | null
	dual_structure_id: string | null
	dual_structure_name: string | null
	dual_structure_notation: string | null
}

export type MappedTypes = Record<string, StructureType>

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

export type GroupedPropertyShort = Pick<
	PropertyDB,
	'id' | 'relation' | 'dual_property_id'
>

export type PropertyAssignmentDB = {
	id: string
	proof: string
	relation: string
	is_deduced: 0 | 1
	is_satisfied: 0 | 1 | null
}

export type PropertyAssignmentDisplay = {
	id: string
	proof: string
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
	proof: string
}

export type ImplicationDB = {
	id: string
	is_equivalence: 0 | 1
	is_deduced: 0 | 1
	dualized_from: string | null
	proof: string
	assumptions: string
	conclusions: string
	mapped_assumptions: string
}

export type ImplicationDisplay = Replace<
	ImplicationDB,
	{
		is_equivalence: boolean
		is_deduced: boolean
		assumptions: string[]
		conclusions: string[]
		mapped_assumptions: Partial<Record<string, string[]>>
	}
>

export type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

export type SearchResults = {
	contradiction: string[] | null
	satisfied_properties: string[]
	unsatisfied_properties: string[]
	dual_satisfied_properties: (string | null)[]
	dual_unsatisfied_properties: (string | null)[]
	dual_search_available: boolean
	found_structures: StructureShort[]
	type: StructureType
}

export type ComparisonResult = {
	structures: RelatedStructure[]
	comparison_table: string[][]
	type: StructureType
}

export type StructureDetails = {
	type: StructureType
	structure: StructureDisplay
	related_structures: RelatedStructure[]
	tags: string[]
	satisfied_properties: PropertyAssignmentDisplay[]
	unsatisfied_properties: PropertyAssignmentDisplay[]
	unknown_properties: PropertyShort[]
	undecidable_properties: PropertyAssignmentDisplay[]
	undistinguishable_structures: StructureShort[]
	comments: CommentObject[]
}

export type CategorySpecificDisplay = {
	objects: string
	morphisms: string
	special_objects: SpecialObject[]
	special_morphisms: SpecialMorphism[]
	functors: StructureShort[]
}

export type FunctorSpecificDisplay = {
	source: string
	source_name: string
	source_notation: string
	target: string
	target_name: string
	target_notation: string
	left_adjoint: string | null
	left_adjoint_name: string | null
	left_adjoint_notation: string | null
	right_adjoint: string | null
	right_adjoint_name: string | null
	right_adjoint_notation: string | null
}

export type MorphismSpecificDisplay = {
	category: string
	category_name: string
	category_notation: string
}
