import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type { ImplicationDB, StructureShort, StructureType } from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'

export function fetch_implication(type: StructureType, id: string) {
	const { results, err } = batch<[ImplicationDB, StructureShort]>([
		sql`
            SELECT
                id,
                is_equivalence,
                is_deduced,
                dualized_from,
                proof,
                assumptions,
                source_assumptions,
                target_assumptions,
                conclusions
            FROM implications_view
            WHERE id = ${id}
        `,
		sql`
            SELECT DISTINCT s.id, s.name
            FROM property_assignments pa
            INNER JOIN structures s ON s.id = pa.structure_id
            WHERE
                pa.type = ${type}
                AND pa.proof LIKE '%/' || ${type} || '-implication/' || ${id} || '%'
        `,
	])

	if (err) error(500, 'Could not load implication')

	const [implications, structures] = results

	if (!implications.length) {
		error(404, `Could not find implication with ID '${id}'`)
	}

	const implication = display_implication(implications[0])

	return { implication, structures }
}
