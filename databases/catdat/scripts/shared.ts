import Database from 'better-sqlite3'
import { join } from 'node:path'

export function are_equal_sets<T>(a: Set<T>, b: Set<T>) {
	return a.size === b.size && [...a].every((el) => b.has(el))
}

export function is_subset<T>(a: Set<T>, b: Set<T>, exception?: T) {
	for (const x of a) {
		if (x !== exception && !b.has(x)) return false
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
