import sql from 'sql-template-tag'
import { query } from './db.catdat'

// TODO: If possible, remove the code duplication with deduction and redundancy scripts.
// TODO: allow functors as well

export type NormalizedCategoryImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

export function get_normalized_category_implications() {
	const { rows, err } = query<{
		id: string
		assumptions: string
		conclusions: string
		is_equivalence: 0 | 1
	}>(
		sql`SELECT id, assumptions, conclusions, is_equivalence FROM category_implications_view`,
	)

	if (err) return { implications: null, err }

	const implications: NormalizedCategoryImplication[] = []

	for (const impl of rows) {
		const assumptions = new Set<string>(JSON.parse(impl.assumptions))
		const conclusions = new Set<string>(JSON.parse(impl.conclusions))

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

export function stringify_implication(implication: NormalizedCategoryImplication) {
	return `${[...implication.assumptions].join(' ∧ ')} ⟹ ${implication.conclusion}`
}
