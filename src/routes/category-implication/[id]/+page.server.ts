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
			FROM category_implications_view
			WHERE id = ${id}
		`,
		sql`
			SELECT c.id, c.name FROM categories c
			WHERE EXISTS (
				SELECT 1 FROM category_property_assignments cp
				WHERE cp.category_id = c.id
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
