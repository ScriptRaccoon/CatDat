export type StructureType = 'category' | 'functor' | 'morphism'

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms',
} as const

export const STRUCTURES: StructureType[] = ['category', 'functor', 'morphism']

export const STRUCTURES_WITH_DUALS: StructureType[] = ['category']

export const TABLES = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms',
} as const
