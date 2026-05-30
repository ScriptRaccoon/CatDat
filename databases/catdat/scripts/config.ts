export type StructureType = 'category' | 'functor'

export const STRUCTURES: StructureType[] = ['category', 'functor']

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
}

/**
 * Proofs longer than this value raise a warning
 * that suggests to use content pages instead.
 */
export const PROOF_LENGTH_THRESHOLD = 1200
