import { type StructureType } from '$shared/config'

export const STRUCTURE_TYPES_WITH_DUALS: StructureType[] = ['category']

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms'
} as const

export const TABLES = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms'
} as const
