import { type Database } from 'better-sqlite3'
import { parse_json_set } from './helpers'

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
			`SELECT c.id, s.name, c.dual_category_id AS dual
            FROM categories c
			INNER JOIN structures s ON s.id = c.id
			ORDER BY lower(s.name)`,
		)
		.all()
}

/**
 * Implications have the form
 * P_1 + ... + P_n ===> Q_1 + ... + Q_m
 * or
 * P_1 + ... + P_n <===> Q_1 + ... + Q_m.
 * This function decomposes them into normalized implications,
 * which have the form
 * P_1 + ... + P_n ===> Q.
 */
export function get_normalized_category_implications(
	db: Database,
): NormalizedCategoryImplication[] {
	const all_implications_db = db
		.prepare<
			never[],
			{
				id: string
				is_equivalence: 0 | 1
				assumptions: string
				conclusions: string
			}
		>(
			`SELECT
				id,
				is_equivalence,
				assumptions,
				conclusions
			FROM implications_view i
			WHERE i.type = 'category'`,
		)
		.all()

	const implications: NormalizedCategoryImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)

		for (const conclusion of conclusions) {
			implications.push({ id: impl.id, assumptions, conclusion })
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: conclusions,
					conclusion: assumption,
				})
			}
		}
	}

	return implications
}
