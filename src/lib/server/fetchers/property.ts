import type {
	ImplicationDB,
	StructureShort,
	PropertyDB,
	StructureType,
} from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { display_implication, display_property } from '$lib/server/transforms'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export function fetch_property(type: StructureType, id: string) {
	const { results, err } = batch<
		[
			PropertyDB,
			{ id: string },
			ImplicationDB,
			StructureShort & { is_satisfied: 0 | 1 | null },
			StructureShort,
		]
	>([
		// basic information
		sql`
            SELECT
                id,
                relation,
                description,
                dual_property_id,
                nlab_link,
                invariant_under_equivalences
            FROM properties
            WHERE id = ${id}
        `,
		// related properties
		sql`
            SELECT related_property_id AS id
            FROM related_properties
            WHERE property_id = ${id}
            ORDER BY lower(id)
        `,
		// relevant implications
		sql`
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
            AND (
                EXISTS (
                    SELECT 1
                    FROM json_each(conclusions)
                    WHERE value = ${id}
                )
                OR
                EXISTS (
                    SELECT 1
                    FROM json_each(assumptions)
                    WHERE value = ${id}
                )
            )
            ORDER BY lower(assumptions) || ' ' || lower(conclusions)
        `,
		// known structures
		sql`
            SELECT s.id, s.name, pa.is_satisfied
            FROM property_assignments pa
            INNER JOIN structures s ON s.id = pa.structure_id
            WHERE
                s.type = ${type}
                AND pa.property_id = ${id}
            ORDER BY lower(s.name)
        `,
		// unknown structures
		sql`
            SELECT s.id, s.name
            FROM structures s
            LEFT JOIN property_assignments pa
                ON pa.structure_id = s.id
                AND pa.property_id = ${id}
            WHERE
                s.type = ${type}
                AND pa.property_id IS NULL
            ORDER BY lower(s.name)
        `,
	])

	if (err) error(500, 'Could not load property')

	const [
		properties,
		related,
		relevant_implications_db,
		known_structures,
		unknown_structures,
	] = results

	if (!properties.length) {
		error(404, `Could not find property with ID '${id}'`)
	}

	const property = display_property(properties[0])

	const related_properties = related.map(({ id }) => id)

	const examples = known_structures.filter((f) => f.is_satisfied === 1)
	const counterexamples = known_structures.filter((f) => f.is_satisfied === 0)
	const undecidable_structures = known_structures.filter((f) => f.is_satisfied === null)

	const relevant_implications = relevant_implications_db.map(display_implication)

	for (const impl of relevant_implications) {
		if (!impl.is_equivalence && impl.conclusions.includes(id)) {
			impl.conclusions = [id]
		}
	}

	return {
		property,
		related_properties,
		examples,
		counterexamples,
		unknown_structures,
		undecidable_structures,
		relevant_implications,
	}
}
