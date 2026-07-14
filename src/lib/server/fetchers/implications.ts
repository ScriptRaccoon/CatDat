import { db } from '$lib/server/db'
import type { ImplicationDB, StructureType } from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'

export function fetch_implications(type: StructureType) {
	const implications_db = db
		.prepare<[StructureType], ImplicationDB>(
			`SELECT
				id,
				is_equivalence,
				is_deduced,
				proof,
				assumptions,
				conclusions,
				mapped_assumptions
			FROM implications_view
			WHERE type = ?
			ORDER BY lower(assumptions) || ' ' || lower(conclusions)`
		)
		.all(type)

	const implications = implications_db.map(display_implication)

	return { type, implications }
}
