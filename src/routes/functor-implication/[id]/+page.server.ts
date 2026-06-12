import { render_nested_formulas } from '$lib/server/formulas'
import { batch } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type { ImplicationDB, StructureShort } from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'

export const load = (event) => {
	const id = event.params.id

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
			WHERE type = 'functor' AND id = ${id}
        `,
		sql`
            SELECT s.id, s.name FROM structures s
            WHERE s.type = 'functor' AND EXISTS (
                SELECT 1 FROM property_assignments cp
                WHERE
                    cp.type = 'functor'
                    AND cp.structure_id = s.id
                    AND cp.proof LIKE '%/functor-implication/' || ${id} || '%'
            )
        `,
	])

	if (err) error(500, 'Could not load implication')

	const [implications, functors] = results

	if (!implications.length) error(404, `Could not find implication with ID '${id}'`)

	const implication = display_implication(implications[0])

	return render_nested_formulas({ implication, functors })
}
