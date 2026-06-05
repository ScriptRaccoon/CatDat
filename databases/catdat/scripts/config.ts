export type StructureType = 'category' | 'functor'

/**
 * Proofs longer than this value raise a warning
 * that suggests to use content pages instead.
 */
export const PROOF_LENGTH_THRESHOLD = 1200

// TODO: remove duplication with "structure_maps" table
export const STRUCTURE_MAPS: Record<StructureType, Record<string, StructureType>> = {
	category: {},
	functor: {
		source: 'category',
		target: 'category',
		left_adjoint: 'functor',
	},
}
