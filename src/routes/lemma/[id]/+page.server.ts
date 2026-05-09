import type { CategoryShort, Lemma } from '$lib/commons/types'
import { batch, query } from '$lib/server/db.catdat'
import { render_nested_formulas } from '$lib/server/rendering'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async (event) => {
	const id = event.params.id

	const { results, err } = batch<[Lemma, CategoryShort, { id: string }]>([
		sql`
        	SELECT id, title, claim, proof FROM lemmas WHERE id = ${id}
    	`,
		sql`
			SELECT c.id, c.name
			FROM categories c
			WHERE EXISTS (
				SELECT 1
				FROM category_property_assignments cp
				WHERE cp.category_id = c.id
				AND cp.is_deduced = FALSE
				AND cp.reason LIKE '%/lemma/' || ${id} || '%'
			);
		`,
		sql`
			SELECT id FROM category_implications
			WHERE reason LIKE '%/lemma/' || ${id} || '%'
		`,
	])

	if (err) error(500, 'Could not load lemma')

	const [lemmas, categories, implications] = results

	if (!lemmas.length) error(404, 'Lemma not found')

	const lemma = lemmas[0]

	return render_nested_formulas({ lemma, categories, implications })
}
