import type { StructureType } from '$shared/config'

export type { StructureType }

type Replace<T, R extends Partial<Record<keyof T, any>>> = Omit<T, keyof R> & R

export type StructureShort = {
	id: string
	name: string
}

export type StructureShortDictionary = Partial<Record<StructureType, StructureShort[]>>

export type RelatedStructure = StructureShort & { notation: string }

export type AssociatedStructure = RelatedStructure & {
	label: string
	associated_type: StructureType
}

export type StructureDisplay = {
	id: string
	name: string
	notation: string
	description: string
	nlab_link: string | null
	dual_structure_id: string | null
	dual_structure_name: string | null
	dual_structure_notation: string | null
	parent: string | null
	parent_name: string | null
	parent_notation: string | null
}

export type AssociatedTypes = Record<string, StructureType>

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

export type CategoryDefinition = {
	objects: string
	morphisms: string
}

export type SpecialObject = {
	type: string
	description: string
}

export type SpecialMorphism = {
	type: string
	// null when the morphisms of this type have not been determined
	description: string | null
	proof: string
}

export type ImplicationDB = {
	id: string
	is_equivalence: 0 | 1
	is_deduced: 0 | 1
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
		mapped_assumptions: Partial<Record<string, Set<string>>>
	}
>

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
	associated_structures: AssociatedStructure[]
	related_structures: RelatedStructure[]
	structures_based_on: StructureShortDictionary
	children: RelatedStructure[]
	tags: string[]
	satisfied_properties: PropertyAssignmentDisplay[]
	unsatisfied_properties: PropertyAssignmentDisplay[]
	unknown_properties: PropertyShort[]
	undecidable_properties: PropertyAssignmentDisplay[]
	indistinguishable_structures: StructureShort[]
	comments: CommentObject[]
}

export type CategorySpecificDisplay = {
	objects: string
	morphisms: string
	special_objects: SpecialObject[]
	special_morphisms: SpecialMorphism[]
}
