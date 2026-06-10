export type StructureType = 'category' | 'functor'

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
} as const

// TODO: move this to the schema
export const STRUCTURE_MAPS = [
	['source', 'functor', 'category'],
	['target', 'functor', 'category'],
] as const
