export type StructureType = 'category' | 'functor'

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
} as const

export const STRUCTURES_WITH_DUALS: StructureType[] = ['category']
