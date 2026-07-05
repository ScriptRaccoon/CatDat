import type {
	CommentObject,
	PropertyAssignmentDB,
	PropertyShort,
	RelatedStructure,
	StructureDetails,
	StructureDisplay,
	StructureShort,
	StructureType,
	TagObject,
} from '$lib/commons/types'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'
import { batch } from '$lib/server/db.catdat'
import { display_property_assignment } from '$lib/server/transforms'

export function fetch_structure(type: StructureType, id: string): StructureDetails {
	const { err, results } = batch<
		[
			StructureDisplay,
			RelatedStructure,
			TagObject,
			PropertyAssignmentDB,
			PropertyShort,
			StructureShort,
			CommentObject,
		]
	>([
		// basic information
		sql`
            SELECT
                s.id,
                s.name,
                s.notation,
                s.description,
                s.nlab_link,
                s.dual_structure_id,
                ds.name AS dual_structure_name,
                ds.notation AS dual_structure_notation
            FROM structures s
            LEFT JOIN structures ds ON ds.id = s.dual_structure_id
            WHERE s.id = ${id}
        `,
		// related structures
		sql`
            SELECT
                c.id,
                c.name,
                c.notation
            FROM related_structures r
            INNER JOIN structures c ON c.id = r.related_structure_id
            WHERE r.structure_id = ${id}
            ORDER BY lower(c.name)
        `,
		// tags
		sql`
            SELECT st.tag
            FROM structure_tag_assignments st
            INNER JOIN structure_tags t ON t.tag = st.tag
            WHERE t.type = ${type} AND st.structure_id = ${id}
            ORDER BY t.id
        `,
		// properties
		sql`
            SELECT
                pa.property_id AS id,
                pa.is_satisfied,
                pa.proof,
                pa.is_deduced,
                p.relation
            FROM property_assignments pa
            INNER JOIN properties p
            ON p.id = pa.property_id AND p.type = pa.type
            WHERE pa.structure_id = ${id}
            ORDER BY pa.id
        `,
		// unknown properties
		sql`
            SELECT p.id, p.relation
            FROM properties p
            WHERE p.type = ${type} AND NOT EXISTS (
                SELECT 1 FROM property_assignments
                WHERE structure_id = ${id} AND property_id = p.id
            )
            ORDER BY lower(p.id)
        `,
		// undistinguishable structures
		sql`
            SELECT u.id, u.name
            FROM structures u
            JOIN properties p ON p.type = u.type
            LEFT JOIN property_assignments pa
                ON pa.structure_id = ${id}
                AND pa.property_id = p.id
            LEFT JOIN property_assignments up
                ON up.structure_id = u.id
                AND up.property_id = p.id
            WHERE
                u.type = ${type}
                AND u.id != ${id}
            GROUP BY u.id, u.name
            HAVING SUM(
                CASE
                    WHEN pa.is_satisfied IS up.is_satisfied THEN 0
                    ELSE 1
                END
            ) = 0;
        `,
		// comments
		sql`
            SELECT id, comment FROM structure_comments
            WHERE structure_id = ${id}
        `,
	])

	if (err) error(500, `Could not load ${type} with ID ${id}`)

	const [
		structures,
		related_structures,
		tag_objects,
		properties_db,
		unknown_properties,
		undistinguishable_structures,
		comments,
	] = results

	if (!structures.length) error(404, `Could not find ${type} with ID '${id}'`)

	const structure = structures[0]
	const tags = tag_objects.map(({ tag }) => tag)

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
		related_structures,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		undistinguishable_structures,
		comments,
	}
}
