import type {
	ImplicationDB,
	StructureShort,
	PropertyDB,
	StructureType
} from '$lib/commons/types'
import { db } from '$lib/server/db'
import { display_implication, display_property } from '$lib/server/transforms'
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
			`SELECT pt.tag
            FROM property_tag_assignments pt
            INNER JOIN property_tags t
            ON t.tag = pt.tag AND t.type = ?
            WHERE pt.property_id = ? AND pt.type = t.type
            ORDER BY t.id`
		)
		.pluck()
		.all(type, id)

	const relevant_implications_db = db
		.prepare<string[], ImplicationDB>(
			`SELECT
                id,
                is_equivalence,
                is_deduced,
                dualized_from,
                proof,
                assumptions,
                conclusions,
                mapped_assumptions
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

	const known_structures = db
		.prepare<
			[StructureType, string],
			StructureShort & { is_satisfied: 0 | 1 | null }
		>(
			`SELECT s.id, s.name, pa.is_satisfied
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

	for (const impl of relevant_implications) {
		if (!impl.is_equivalence && impl.conclusions.includes(id)) {
			impl.conclusions = [id]
		}
	}

	return {
		type,
		property,
		related_properties,
		tags,
		examples,
		counterexamples,
		unknown_structures,
		undecidable_structures,
		relevant_implications
	}
}
