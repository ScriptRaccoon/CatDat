import { type Database } from 'better-sqlite3'

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
	type FunctorDBFull = {
		id: string
		name: string
		source: string
		target: string
		source_props: string
		target_props: string
	}

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
		.all() as FunctorDBFull[]

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		associated_satisfied_properties: {
			source: new Set(JSON.parse(row.source_props)),
			target: new Set(JSON.parse(row.target_props)),
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
	type ImplicationDB = {
		id: string
		assumptions: string
		source_assumptions: string
		target_assumptions: string
		conclusions: string
		is_equivalence: number
	}

	const all_implications_db = db
		.prepare(
			`SELECT
                id, assumptions, source_assumptions, target_assumptions,
				conclusions, is_equivalence
			FROM functor_implications_view`,
		)
		.all() as ImplicationDB[]

	const implications: NormalizedFunctorImplication[] = []

	for (const impl of all_implications_db) {
		const assumptions: string[] = JSON.parse(impl.assumptions)
		const conclusions: string[] = JSON.parse(impl.conclusions)
		const source_assumptions: string[] = JSON.parse(impl.source_assumptions)
		const target_assumptions: string[] = JSON.parse(impl.target_assumptions)

		for (const conclusion of conclusions) {
			implications.push({
				id: impl.id,
				assumptions: new Set(assumptions),
				conclusion,
				associated_assumptions: {
					source: new Set(source_assumptions),
					target: new Set(target_assumptions),
				},
			})
		}

		if (impl.is_equivalence) {
			for (const assumption of assumptions) {
				implications.push({
					id: impl.id,
					assumptions: new Set(conclusions),
					conclusion: assumption,
					associated_assumptions: {
						source: new Set(source_assumptions),
						target: new Set(target_assumptions),
					},
				})
			}
		}
	}

	return implications
}
