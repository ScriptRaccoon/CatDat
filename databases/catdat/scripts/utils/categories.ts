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
			`SELECT id, name, dual_category_id as dual
            FROM categories_view ORDER BY lower(name)`,
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
	// TODO: This needs to be unified with the functor case.

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
				i.id,
				i.is_equivalence,
				(
					SELECT json_group_array(property_id)
					FROM implication_properties ip
					WHERE ip.implication_id  = i.id
					AND ip.structure = 'self'
					AND ip.kind = 'assumption'
				) as assumptions,
				(
					SELECT json_group_array(property_id)
					FROM implication_properties ip
					WHERE ip.implication_id  = i.id
					AND ip.structure = 'self'
					AND ip.kind = 'conclusion'
				) as conclusions
			FROM implications i
			WHERE i.type = 'category'
			GROUP BY i.id`,
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
