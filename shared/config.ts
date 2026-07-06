export const STRUCTURE_TYPES = ['category', 'functor', 'morphism'] as const

export type StructureType = (typeof STRUCTURE_TYPES)[number]
