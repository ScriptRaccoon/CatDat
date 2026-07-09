export function is_string_array(arr: unknown): arr is string[] {
	return Array.isArray(arr) && arr.every((el) => typeof el === 'string')
}

export function is_object(obj: unknown): obj is Record<string, unknown> {
	return obj != null && obj.constructor.name === 'Object'
}

export function are_equal_sets<T>(a: Set<T>, b: Set<T>) {
	return a.size === b.size && [...a].every((el) => b.has(el))
}

export function is_subset<T>(a: Set<T>, b: Set<T>, options?: { exception: T }) {
	for (const x of a) {
		if (x !== options?.exception && !b.has(x)) return false
	}
	return true
}

export const sleep = (delay: number) => new Promise<void>((res) => setTimeout(res, delay))

export function capitalize(txt: string) {
	return txt[0].toUpperCase() + txt.slice(1)
}

export function pluralize(count: number, forms: { one: string; other: string }) {
	const word = count === 1 ? forms.one : forms.other
	return word.replace('{count}', String(count))
}

/**
 * Removes accents from letters and transforms to lowercase
 */
export function normalize_text(txt: string) {
	return txt
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
}

export function parse_json_set<T>(json: string): Set<T> {
	return new Set(JSON.parse(json))
}

export function parse_nested_json_set<T>(json: string): Partial<Record<string, Set<T>>> {
	const obj = JSON.parse(json)
	const result: Partial<Record<string, Set<T>>> = {}
	for (const key in obj) {
		result[key] = parse_json_set(obj[key])
	}
	return result
}

export function to_placeholders(arr: string[]): string {
	return arr.map(() => '?').join(', ')
}

export function strip_math(s: string) {
	return s.replaceAll('$', '')
}

export function add_math(s: string) {
	return `$${s}$`
}
