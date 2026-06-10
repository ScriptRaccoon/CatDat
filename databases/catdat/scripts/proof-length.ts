import { type StructureType } from './config'
import { get_client } from './utils/helpers'

const db = get_client()

const PROOF_LENGTH_THRESHOLD = 1200

report_long_proofs()

/**
 * Prints proofs whose lengths exceed the given threshold and should
 * perhaps be moved to a separate content page.
 */
function report_long_proofs() {
	report_long_property_proofs('category')
	report_long_property_proofs('functor')
	report_long_implication_proofs('category')
	report_long_implication_proofs('functor')
}

function report_long_property_proofs(type: StructureType) {
	const long_proofs = db
		.prepare<
			[StructureType, number],
			{ id: string; property: string; length: number }
		>(
			`SELECT
                structure_id AS id,
                property_id AS property,
                length(proof) AS length
            FROM property_assignments
            WHERE type = ? AND is_deduced = FALSE AND length(proof) >= ?
            ORDER BY length(proof) DESC`,
		)
		.all(type, PROOF_LENGTH_THRESHOLD)

	if (!long_proofs.length) return

	console.info(`\n--- Long property proofs (type: ${type}) ---`)

	for (const { id, property, length } of long_proofs) {
		console.warn(
			`🟡 The proof for (${id}, ${property}) has ${length} characters. Consider moving it to a content page.`,
		)
	}
}

function report_long_implication_proofs(type: StructureType) {
	const long_proofs = db
		.prepare<[number], { id: string; length: number }>(
			`SELECT
                id,
                length(proof) AS length
            FROM ${type}_implications
            WHERE is_deduced = FALSE AND length(proof) >= ?
            ORDER BY length(proof) DESC`,
		)
		.all(PROOF_LENGTH_THRESHOLD)

	if (!long_proofs.length) return

	console.info(`\n--- Long implication proofs (type: ${type}) ---`)

	for (const { id, length } of long_proofs) {
		console.warn(
			`🟡 The proof for ${id} has ${length} characters. Consider moving it to a content page.`,
		)
	}
}
