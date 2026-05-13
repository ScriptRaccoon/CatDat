import Database from 'better-sqlite3'
import { join } from 'node:path'

export function are_equal_sets<T>(a: Set<T>, b: Set<T>) {
	return a.size === b.size && [...a].every((el) => b.has(el))
}

export function is_subset<T>(a: Set<T>, b: Set<T>, options?: { exception: T }) {
	for (const x of a) {
		if (x !== options?.exception && !b.has(x)) return false
	}
	return true
}

export function get_client() {
	const db_path = join(process.cwd(), 'databases', 'catdat', 'catdat.db')
	return new Database(db_path, { readonly: false })
}

type NormalizedImplication = {
	id: string
	assumptions: Set<string>
	conclusion: string
}

type PropertyMeta = {
	id: string
	dual_property_id: string | null
	relation: string
	negation: string
	conditional: string
}

export function get_assumption_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { assumptions } = implication

	return Array.from(assumptions)
		.map(
			(assumption) =>
				`${properties_dict[assumption][conditional ? 'conditional' : 'relation']} ${assumption}`,
		)
		.join(' and ')
}

export function get_conclusion_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false,
): string {
	const { conclusion } = implication

	return `${properties_dict[conclusion][conditional ? 'conditional' : 'relation']} ${conclusion}`
}

export function get_reason_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
) {
	const assumption_string = get_assumption_string(implication, properties_dict)
	const conclusion_string = get_conclusion_string(implication, properties_dict)

	const ref = `by <a href="/category-implication/${implication.id}">this result</a>`
	return `Since it ${assumption_string}, it ${conclusion_string} (${ref}).`
}

export function get_contradiction_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	property: string,
) {
	const assumption_string = get_assumption_string(implication, properties_dict, true)
	const conclusion_string = get_conclusion_string(implication, properties_dict, true)

	const has_multiple_assumptions = implication.assumptions.size > 1

	const ref = `by <a href="/category-implication/${implication.id}">this result</a>`

	const contra = `Assume for contradiction that it ${properties_dict[property].relation} ${property}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}
