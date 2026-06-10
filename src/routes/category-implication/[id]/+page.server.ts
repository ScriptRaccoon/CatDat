import type { StructureShort, ImplicationDB } from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/formulas'
import { display_implication } from '$lib/server/transforms'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
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
				conclusions
			FROM implications_view
			WHERE type = 'category' AND id = ${id}
		`,
		sql`
			SELECT s.id, s.name FROM structures s
			WHERE s.type = 'category' AND EXISTS (
				SELECT 1 FROM property_assignments cp
				WHERE
					cp.type = 'category'
					AND cp.structure_id = s.id
					AND cp.proof LIKE '%/category-implication/' || ${id} || '%'
			)
		`,
	])

	if (err) error(500, 'Could not load implication')

	const [implications, categories] = results

	if (!implications.length) error(404, `Could not find implication with ID '${id}'`)

	const implication = display_implication(implications[0])

	return render_nested_formulas({ implication, categories })
}
