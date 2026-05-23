export function is_object(obj: unknown): obj is Record<string, unknown> {
	return obj != null && obj.constructor.name === 'Object'
}

export function is_subset<T>(a: Set<T>, b: Set<T>) {
	for (const x of a) {
		if (!b.has(x)) return false
	}
	return true
}

export function to_placeholders(arr: string[]): string {
	return arr.map(() => '?').join(', ')
}

export const sleep = (delay: number) => new Promise<void>((res) => setTimeout(res, delay))

export function parse_json_set<T>(json: string): Set<T> {
	return new Set(JSON.parse(json))
}
