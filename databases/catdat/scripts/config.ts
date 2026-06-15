export type StructureType = 'category' | 'functor'

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
} as const

// TODO: integrate this into schema
export const STRUCTURE_MAPS = [
	['source', 'functor', 'category'],
	['target', 'functor', 'category'],
] as const

export const STRUCTURES_WITH_DUALS: StructureType[] = ['category']
