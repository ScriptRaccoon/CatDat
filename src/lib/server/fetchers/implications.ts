import { db } from '#lib/server/db.ts'
import type {
	ImplicationDB,
	ImplicationDisplay,
	StructureType
} from '#lib/commons/types.ts'
import { display_implication } from '#lib/server/transforms.ts'

export function fetch_implications(type: StructureType) {
	const implications = fetch_implication_list(type, {
		is_undecidable: false
	})

	const undecidable_implications = fetch_implication_list(type, {
		is_undecidable: true
	})

	return { type, implications, undecidable_implications }
}

/**
 * Returns the implications of a given type that hold or, depending on the flag,
 * the undecidable ones. If a property is given, only those whose assumptions
 * or conclusions contain this property are returned.
 */
export function fetch_implication_list(
	type: StructureType,
	options: { is_undecidable: boolean; property_id?: string }
): ImplicationDisplay[] {
	const property_id = options.property_id ?? null

	return db
		.prepare<
			[StructureType, number, string | null, string | null, string | null],
			ImplicationDB
		>(
			`SELECT
				id,
				is_equivalence,
				is_deduced,
				proof,
				assumptions,
				conclusions,
				associated_assumptions
			FROM implications_view
			WHERE type = ? AND is_undecidable = ?
			AND (
				? IS NULL
				OR EXISTS (SELECT 1 FROM json_each(conclusions) WHERE value = ?)
				OR EXISTS (SELECT 1 FROM json_each(assumptions) WHERE value = ?)
			)
			ORDER BY lower(assumptions) || ' ' || lower(conclusions)`
		)
		.all(type, Number(options.is_undecidable), property_id, property_id, property_id)
		.map(display_implication)
}
