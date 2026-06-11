import { type Database } from 'better-sqlite3'
import { parse_json_set } from './helpers'

type FunctorMeta = {
	id: string
	name: string
	associated_satisfied_properties: {
		source: Set<string>
		target: Set<string>
	}
}

/**
 * Returns the list of functors saved in the database along with
 * the satisfied properties of their source and target category.
 */
export function get_functors(db: Database): FunctorMeta[] {
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
				f.id,
				s.name,
				f.source,
				f.target,
				(
					SELECT json_group_array(property_id) FROM (
						SELECT property_id
						FROM property_assignments
						WHERE
							type = 'category'
							AND structure_id = f.source
							AND is_satisfied = TRUE
					)
				) AS source_props,
				(
					SELECT json_group_array(property_id) FROM (
						SELECT property_id
						FROM property_assignments
						WHERE
							type = 'category'
							AND structure_id = f.target
							AND is_satisfied = TRUE
					)
				) AS target_props
			FROM functors f
			INNER JOIN structures s ON s.id = f.id
			ORDER BY lower(s.name)`,
		)
		.all()

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		associated_satisfied_properties: {
			source: parse_json_set<string>(row.source_props),
			target: parse_json_set<string>(row.target_props),
		},
	}))
}
