import { type Database } from 'better-sqlite3'
import { StructureType } from '../config'
import { parse_json_set } from './helpers'

/**
 * A structure is a category or a functor.
 */
export type StructureMeta = {
	id: string
	name: string
	dual?: string | null
	// used for source and target properties of a functor
	associated_satisfied_properties?: Record<string, Set<string>>
}

/**
 * Returns the list of stored categorical structures of a given type.
 */
export function get_structures(db: Database, type: StructureType): StructureMeta[] {
	if (type === 'category') return get_categories(db)
	if (type === 'functor') return get_functors(db)
	throw new Error('Unsupported type')
}

/**
 * Returns the list of categories saved in the database.
 */
function get_categories(db: Database) {
	return db
		.prepare<
			never[],
			{
				id: string
				name: string
				dual: string | null
			}
		>(
			`SELECT
                c.id,
                s.name,
                s.dual_structure_id AS dual
            FROM categories c
            INNER JOIN structures s ON s.id = c.id
            ORDER BY lower(s.name)`,
		)
		.all()
}

/**
 * Returns the list of functors saved in the database along with
 * the satisfied properties of their source and target category.
 */
function get_functors(db: Database) {
	const rows = db
		.prepare<
			never[],
			{
				id: string
				name: string
				source_props: string
				target_props: string
			}
		>(
			`SELECT
				f.id,
				s.name,
				(
					SELECT json_group_array(property_id)
					FROM property_assignments
					WHERE
						structure_id = f.source
						AND is_satisfied = TRUE
					
				) AS source_props,
				(
					SELECT json_group_array(property_id)
					FROM property_assignments
					WHERE
						structure_id = f.target
						AND is_satisfied = TRUE
				) AS target_props
			FROM functors f
			INNER JOIN structures s ON s.id = f.id
			ORDER BY lower(s.name)`,
		)
		.all()

	return rows.map((functor) => ({
		id: functor.id,
		name: functor.name,
		associated_satisfied_properties: {
			source: parse_json_set<string>(functor.source_props),
			target: parse_json_set<string>(functor.target_props),
		},
	}))
}

/**
 * Checks if a structure is a dual, but not the
 * original structure to prevent circular reasoning.
 */
export function is_dual_structure(
	structure: StructureMeta,
): structure is StructureMeta & { dual: string } {
	return Boolean(structure.dual) && structure.name.toLowerCase().startsWith('dual')
}
