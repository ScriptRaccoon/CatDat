import { db } from '#lib/server/db.ts'
import type { StructureType, UndecidableImplication } from '#lib/commons/types.ts'

/**
 * Returns the undecidable implications of a given type. If a property is given,
 * only those whose assumption or conclusion is this property are returned.
 */
export function fetch_undecidable_implications(
	type: StructureType,
	property_id: string | null = null
) {
	return db
		.prepare<[StructureType, string | null, string | null], UndecidableImplication>(
			`SELECT
				id,
				assumption_id AS assumption,
				conclusion_id AS conclusion,
				proof
			FROM undecidable_implications
			WHERE type = ?
			AND (? IS NULL OR ? IN (assumption_id, conclusion_id))
			ORDER BY lower(assumption_id), lower(conclusion_id)`
		)
		.all(type, property_id, property_id)
}
