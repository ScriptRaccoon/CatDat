export type StructureType = 'category' | 'functor'

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
} as const

export const STRUCTURES: StructureType[] = ['category', 'functor']

export const STRUCTURES_WITH_DUALS: StructureType[] = ['category']
