import { type Database } from 'better-sqlite3'

type CategoryMeta = {
	id: string
	name: string
	dual: string | null
}

export type NormalizedCategoryImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

/**
 * Returns the list of categories saved in the database.
 */
export function get_categories(db: Database) {
	return db
		.prepare<never[], CategoryMeta>(
			`SELECT c.id, s.name, s.dual_structure_id AS dual
            FROM categories c
			INNER JOIN structures s ON s.id = c.id
			ORDER BY lower(s.name)`,
		)
		.all()
}
