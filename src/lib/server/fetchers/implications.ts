import { query } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import { error } from '@sveltejs/kit'
import type {
	ImplicationDB,
	NormalizedImplication,
	StructureType,
} from '$lib/commons/types'
import { display_implication } from '$lib/server/transforms'
import { parse_json_set } from '$lib/server/utils'

export function fetch_implications(type: StructureType) {
	const { rows, err } = query<ImplicationDB>(sql`
        SELECT
            id,
            is_equivalence,
            is_deduced,
            dualized_from,
            proof,
            assumptions,
            source_assumptions,
            target_assumptions,
            conclusions
        FROM implications_view
        WHERE type = ${type}
        ORDER BY lower(assumptions) || ' ' || lower(conclusions)
    `)

	if (err) error(500, 'Could not load implications')

	const implications = rows.map(display_implication)

	return { implications }
}

/**
 * List of normalized implications of a given type that have,
 * in the case of functors, no source and no target assumptions,
 * i.e. those that are universally true. Only those are relevant
 * for the consistency check.
 */
export function get_normalized_implications(type: StructureType) {
	// TODO: remove duplication with deduction script

	const { rows, err } = query<{
		id: string
		is_equivalence: 0 | 1
		assumptions: string
		source_assumptions: string
		target_assumptions: string
		conclusions: string
	}>(
		sql`
			SELECT
				id,
				is_equivalence,
				assumptions,
				source_assumptions,
				target_assumptions,
				conclusions
			FROM implications_view
			WHERE type = ${type}
		`,
	)

	if (err) return { implications: null, err }

	const implications: NormalizedImplication[] = []

	for (const impl of rows) {
		const assumptions = parse_json_set<string>(impl.assumptions)
		const source_assumptions = parse_json_set<string>(impl.source_assumptions)
		const target_assumptions = parse_json_set<string>(impl.target_assumptions)
		const conclusions = parse_json_set<string>(impl.conclusions)

		if (source_assumptions.size > 0 || target_assumptions.size > 0) continue

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

	return { implications, err: null }
}
