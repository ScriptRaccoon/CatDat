export const STRUCTURE_TYPES = [
	'category',
	'functor',
	'morphism',
	'symmetric_monoidal_category'
] as const

export type StructureType = (typeof STRUCTURE_TYPES)[number]

export function is_structure_type(txt: string): txt is StructureType {
	return (STRUCTURE_TYPES as readonly string[]).includes(txt)
}

export const STRUCTURE_TYPES_WITH_DUALS: StructureType[] = [
	'category',
	'symmetric_monoidal_category'
]

export const PLURALS: Record<StructureType, string> = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms',
	symmetric_monoidal_category: 'symmetric monoidal categories'
}
