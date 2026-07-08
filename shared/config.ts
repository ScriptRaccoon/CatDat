export const STRUCTURE_TYPES = ['category', 'functor', 'morphism'] as const

export type StructureType = (typeof STRUCTURE_TYPES)[number]

export function is_structure_type(txt: string): txt is StructureType {
	return (STRUCTURE_TYPES as readonly string[]).includes(txt)
}

export const STRUCTURE_TYPES_WITH_DUALS: StructureType[] = ['category']

export const PLURALS: Record<StructureType, string> = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms'
}
