import { type Database } from 'better-sqlite3'
import type { StructureMeta } from './deduction'

/**
 * Returns the list of categories saved in the database.
 */
export function get_categories(db: Database): StructureMeta[] {
	return db
		.prepare<never[], StructureMeta>(
			`SELECT id, name, dual_category_id as dual
            FROM categories_view ORDER BY lower(name)`,
		)
		.all()
}
