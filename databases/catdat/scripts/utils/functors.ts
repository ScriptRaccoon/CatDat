import { type Database } from 'better-sqlite3'
import { parse_json_set } from './helpers'
import type { StructureMeta } from './deduction'

/**
 * Returns the list of functors saved in the database along with
 * the satisfied properties of their source and target category.
 */
export function get_functors(db: Database): StructureMeta[] {
	const rows = db
		.prepare<
			never[],
			{
				id: string
				name: string
				source: string
				target: string
				source_props: string
				target_props: string
			}
		>(
			`SELECT
				id, name, source, target,
				(
					SELECT json_group_array(property_id)
					FROM property_assignments
					WHERE structure_id = source AND is_satisfied = TRUE
				) as source_props,
				(
					SELECT json_group_array(property_id)
					FROM property_assignments
					WHERE structure_id = target AND is_satisfied = TRUE
				) as target_props
			FROM functors_view
			ORDER BY lower(name)`,
		)
		.all()

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		source_props: parse_json_set<string>(row.source_props),
		target_props: parse_json_set<string>(row.target_props),
	}))
}
