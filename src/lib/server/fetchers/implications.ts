import { query } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type { ImplicationDB, StructureType } from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'

export function fetch_implications(type: StructureType) {
	const { rows, err } = query<ImplicationDB>(sql`
        SELECT
            id,
            is_equivalence,
            is_deduced,
            dualized_from,
            proof,
            assumptions,
            conclusions,
			mapped_assumptions
        FROM implications_view
        WHERE type = ${type}
        ORDER BY lower(assumptions) || ' ' || lower(conclusions)
    `)

	if (err) error(500, 'Could not load implications')

	const implications = rows.map(display_implication)

	return { type, implications }
}
