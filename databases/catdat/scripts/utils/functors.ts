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

type NormalizedFunctorImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
	associated_assumptions: {
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
		.prepare(
			`SELECT
				id, name, source, target,
				(
					SELECT json_group_array(property_id) FROM (
						SELECT property_id
						FROM category_property_assignments
						WHERE category_id = source AND is_satisfied = TRUE
					)
				) as source_props,
				(
					SELECT json_group_array(property_id) FROM (
						SELECT property_id
						FROM category_property_assignments
						WHERE category_id = target AND is_satisfied = TRUE
					)
				) as target_props
			FROM functors
			ORDER BY lower(name)`,
		)
		.all() as {
		id: string
		name: string
		source: string
		target: string
		source_props: string
		target_props: string
	}[]

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		associated_satisfied_properties: {
			source: parse_json_set<string>(row.source_props),
			target: parse_json_set<string>(row.target_props),
		},
	}))
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
export function get_normalized_functor_implications(
	db: Database,
): NormalizedFunctorImplication[] {
	const all_implications_db = db
		.prepare(
			`SELECT
                id, assumptions, source_assumptions, target_assumptions,
				conclusions, is_equivalence
			FROM functor_implications_view`,
		)
		.all() as {
		id: string
		assumptions: string
		source_assumptions: string
		target_assumptions: string
		conclusions: string
		is_equivalence: 0 | 1
	}[]

	const implications: NormalizedFunctorImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)
		const source_assumptions = parse_json_set<string>(impl.source_assumptions)
		const target_assumptions = parse_json_set<string>(impl.target_assumptions)

		for (const conclusion of conclusions) {
			implications.push({
				id: impl.id,
				assumptions,
				conclusion,
				associated_assumptions: {
					source: source_assumptions,
					target: target_assumptions,
				},
			})
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: conclusions,
					conclusion: assumption,
					associated_assumptions: {
						source: source_assumptions,
						target: target_assumptions,
					},
				})
			}
		}
	}

	return implications
}
