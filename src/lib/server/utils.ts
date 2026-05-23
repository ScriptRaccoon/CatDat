export function is_object(obj: unknown): obj is Record<string, unknown> {
	return obj != null && obj.constructor.name === 'Object'
}

export function is_subset<T>(a: Set<T>, b: Set<T>) {
	for (const x of a) {
		if (!b.has(x)) return false
	}
	return true
}

export const sleep = (delay: number) => new Promise<void>((res) => setTimeout(res, delay))
