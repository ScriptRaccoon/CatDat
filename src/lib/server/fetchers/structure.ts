import type {
	CommentObject,
	PropertyAssignmentDB,
	PropertyShort,
	RelatedStructure,
	StructureDetails,
	StructureDisplay,
	StructureShort,
	StructureShortDictionary,
	StructureType,
	AssociatedStructure
} from '$lib/commons/types'
import { error } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import { display_property_assignment } from '$lib/server/transforms'

export function fetch_structure(type: StructureType, id: string): StructureDetails {
	const structure = db
		.prepare<[string], StructureDisplay>(
			`SELECT
                s.id,
                s.name,
                s.notation,
                s.description,
                s.nlab_link,
                s.dual_structure_id,
                ds.name AS dual_structure_name,
                ds.notation AS dual_structure_notation,
				s.parent,
				ps.name AS parent_name,
				ps.notation AS parent_notation
            FROM structures s
            LEFT JOIN structures ds ON ds.id = s.dual_structure_id
			LEFT JOIN structures ps ON ps.id = s.parent
            WHERE s.id = ?`
		)
		.get(id)

	if (!structure) {
		error(404, `Could not find ${type} with ID '${id}'`)
	}

	const associated_structures = db
		.prepare<[string], AssociatedStructure>(
			`SELECT
                s.id,
                s.name,
                s.notation,
				a.label,
				a.associated_type
            FROM associated_structures a
            INNER JOIN structures s
            ON s.id = a.associated_structure_id
            WHERE a.structure_id = ?`
		)
		.all(id)

	const related_structures = db
		.prepare<[string], RelatedStructure>(
			`SELECT
                s.id,
                s.name,
                s.notation
            FROM related_structures r
            INNER JOIN structures s ON s.id = r.related_structure_id
            WHERE r.structure_id = ?
            ORDER BY lower(s.name)`
		)
		.all(id)

	const list_structures_based_on = db
		.prepare<[string], StructureShort & { type: StructureType }>(
			`SELECT DISTINCT s.id, s.name, a.type
			FROM associated_structures a
			INNER JOIN structures s
			ON s.id = a.structure_id
			INNER JOIN associated_structure_types m
			ON
				m.label = a.label
				AND m.type = a.type
				AND m.associated_type = a.associated_type
			WHERE a.associated_structure_id = ? AND m.required = TRUE
			ORDER BY a.type, lower(s.name)`
		)
		.all(id)

	const structures_based_on: StructureShortDictionary = {}

	for (const { id, name, type } of list_structures_based_on) {
		structures_based_on[type] ??= []
		structures_based_on[type].push({ id, name })
	}

	const children = db
		.prepare<[string], RelatedStructure>(
			`SELECT s.id, s.name, s.notation
			FROM structures s WHERE s.parent = ?`
		)
		.all(id)

	const tags = db
		.prepare<[StructureType, string], string>(
			`SELECT st.tag
            FROM structure_tag_assignments st
            INNER JOIN structure_tags t ON t.tag = st.tag
            WHERE t.type = ? AND st.structure_id = ?
            ORDER BY t.id`
		)
		.pluck()
		.all(type, id)

	const properties_db = db
		.prepare<[string], PropertyAssignmentDB>(
			`SELECT
                pa.property_id AS id,
                pa.is_satisfied,
                pa.proof,
                pa.is_deduced,
                CASE
                    WHEN pa.is_satisfied = FALSE THEN r.negation
                    ELSE p.relation
                END AS relation
            FROM property_assignments pa
            INNER JOIN properties p
            ON p.id = pa.property_id AND p.type = pa.type
            INNER JOIN relations r
            ON r.relation = p.relation
            WHERE pa.structure_id = ?
            ORDER BY pa.id`
		)
		.all(id)

	const unknown_properties = db
		.prepare<[StructureType, string], PropertyShort>(
			`SELECT p.id, p.relation
            FROM properties p
            WHERE p.type = ?
            AND NOT EXISTS (
                SELECT 1 FROM property_assignments
                WHERE structure_id = ? AND property_id = p.id
            )
            ORDER BY lower(p.id)`
		)
		.all(type, id)

	const indistinguishable_structures = db
		.prepare<[string, StructureType, string], StructureShort>(
			`SELECT u.id, u.name
            FROM structures u
            JOIN properties p ON p.type = u.type
            LEFT JOIN property_assignments pa
            ON pa.structure_id = ? AND pa.property_id = p.id
            LEFT JOIN property_assignments up
            ON up.structure_id = u.id AND up.property_id = p.id
            WHERE u.type = ? AND u.id != ?
            GROUP BY u.id, u.name
            HAVING SUM(
                CASE
                    WHEN pa.is_satisfied IS up.is_satisfied THEN 0
                    ELSE 1
                END
            ) = 0`
		)
		.all(id, type, id)

	const comments = db
		.prepare<[string], CommentObject>(
			`SELECT id, comment FROM structure_comments
            WHERE structure_id = ?`
		)
		.all(id)

	const satisfied_properties = properties_db
		.filter((obj) => obj.is_satisfied === 1)
		.map(display_property_assignment)

	const unsatisfied_properties = properties_db
		.filter((obj) => obj.is_satisfied === 0)
		.map(display_property_assignment)

	const undecidable_properties = properties_db
		.filter((obj) => obj.is_satisfied === null)
		.map(display_property_assignment)

	return {
		type,
		structure,
		children,
		related_structures,
		associated_structures,
		structures_based_on,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		indistinguishable_structures,
		comments
	}
}
