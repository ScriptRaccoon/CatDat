import type {
	ImplicationDB,
	StructureShort,
	PropertyDB,
	StructureType
} from '#lib/commons/types.ts'
import { db } from '#lib/server/db.ts'
import { display_implication, display_property } from '#lib/server/transforms.ts'
import { fetch_structure_keywords } from '#lib/server/fetchers/structures.ts'
import { fetch_undecidable_implications } from '#lib/server/fetchers/undecidable_implications.ts'
import { error } from '@sveltejs/kit'

export function fetch_property(type: StructureType, id: string) {
	const property_db = db
		.prepare<[string, StructureType], PropertyDB>(
			`SELECT
                id,
                relation,
                description,
                dual_property_id,
                nlab_link,
                invariant_under_equivalences
            FROM properties
            WHERE id = ? AND type = ?`
		)
		.get(id, type)

	if (!property_db) {
		error(404, `Could not find ${type} property with ID '${id}'`)
	}

	const property = display_property(property_db)

	const related_properties = db
		.prepare<[string, StructureType], string>(
			`SELECT related_property_id AS id
            FROM related_properties
            WHERE property_id = ? AND type = ?
            ORDER BY lower(id)`
		)
		.pluck()
		.all(id, type)

	const tags = db
		.prepare<[StructureType, string], string>(
			`SELECT pta.tag
            FROM property_tag_assignments pta
            INNER JOIN property_tags pt
            ON pt.tag = pta.tag AND pt.type = ?
            WHERE pta.property_id = ? AND pta.type = pt.type
            ORDER BY pt.id`
		)
		.pluck()
		.all(type, id)

	const subcategory_inheritance = fetch_subcategory_inheritance(type, id)

	const relevant_implications_db = db
		.prepare<string[], ImplicationDB>(
			`SELECT
                id,
                is_equivalence,
                is_deduced,
                proof,
                assumptions,
                conclusions,
                associated_assumptions
            FROM implications_view
            WHERE type = ?
            AND (
                EXISTS (
                    SELECT 1
                    FROM json_each(conclusions)
                    WHERE value = ?
                )
                OR
                EXISTS (
                    SELECT 1
                    FROM json_each(assumptions)
                    WHERE value = ?
                )
            )
            ORDER BY lower(assumptions) || ' ' || lower(conclusions)`
		)
		.all(type, id, id)

	const relevant_implications = relevant_implications_db.map(display_implication)

	const undecidable_implications = fetch_undecidable_implications(type, id)

	const known_structures = db
		.prepare<
			[StructureType, string],
			StructureShort & { is_satisfied: 0 | 1 | null; is_deduced: 0 | 1 }
		>(
			`SELECT s.id, s.name, pa.is_satisfied, pa.is_deduced
            FROM property_assignments pa
            INNER JOIN structures s ON s.id = pa.structure_id
            WHERE s.type = ? AND pa.property_id = ?
            ORDER BY lower(s.name)`
		)
		.all(type, id)

	const unknown_structures = db
		.prepare<[string, StructureType], StructureShort>(
			`SELECT s.id, s.name
            FROM structures s
            LEFT JOIN property_assignments pa
            ON pa.structure_id = s.id AND pa.property_id = ?
            WHERE s.type = ? AND pa.property_id IS NULL
            ORDER BY lower(s.name)`
		)
		.all(id, type)

	const examples = known_structures.filter((f) => f.is_satisfied === 1)
	const counterexamples = known_structures.filter((f) => f.is_satisfied === 0)
	const undecidable_structures = known_structures.filter((f) => f.is_satisfied === null)

	const deduced_examples_count = examples.filter((f) => f.is_deduced).length
	const deduced_counterexamples_count = counterexamples.filter(
		(f) => f.is_deduced
	).length

	for (const impl of relevant_implications) {
		if (!impl.is_equivalence && impl.conclusions.includes(id)) {
			impl.conclusions = [id]
		}
	}

	const structure_keywords = fetch_structure_keywords(type)

	return {
		type,
		property,
		related_properties,
		tags,
		subcategory_inheritance,
		examples,
		counterexamples,
		deduced_examples_count,
		deduced_counterexamples_count,
		unknown_structures,
		undecidable_structures,
		structure_keywords,
		relevant_implications,
		undecidable_implications
	}
}

function fetch_subcategory_inheritance(type: StructureType, id: string) {
	if (type !== 'category') return null

	const row = db
		.prepare<[string], { requires_full: 0 | 1; requires_inhabited: 0 | 1 }>(
			`SELECT requires_full, requires_inhabited
			FROM subcategory_closed_properties
			WHERE property_id = ?`
		)
		.get(id)

	if (!row) return null

	const adjectives = [
		row.requires_inhabited ? 'inhabited' : '',
		row.requires_full ? 'full' : ''
	].filter(Boolean)

	return [...adjectives, 'subcategories'].join(' ')
}
