export function are_equal_sets<T>(a: Set<T>, b: Set<T>) {
	return a.size === b.size && [...a].every((el) => b.has(el))
}

export function is_subset<T>(a: Set<T>, b: Set<T>, options?: { exception: T }) {
	for (const x of a) {
		if (x !== options?.exception && !b.has(x)) return false
	}
	return true
}

export function capitalize(txt: string) {
	return txt[0].toUpperCase() + txt.slice(1)
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
