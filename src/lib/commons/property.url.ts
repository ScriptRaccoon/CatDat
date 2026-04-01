const ENCODE_MAP: Record<string, string> = {
	' ': '_',
	'ℵ₁': 'aleph1',
}

const DECODE_MAP: Record<string, string> = {
	_: ' ',
	aleph1: 'ℵ₁',
}

export function encode_property_ID(id: string): string {
	let encoded = id
	for (const key in ENCODE_MAP) {
		encoded = encoded.replaceAll(key, ENCODE_MAP[key])
	}
	return encoded
}

export function decode_property_ID(str: string): string {
	let decoded = str
	for (const key in DECODE_MAP) {
		decoded = decoded.replaceAll(key, DECODE_MAP[key])
	}
	return decoded
}

export function get_property_url(id: string) {
	return `/category-property/${encode_property_ID(id)}`
}
