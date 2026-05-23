import type { StructureType } from './types'

const ENCODE_MAP: Record<string, string> = {
	' ': '_',
	'ℵ₀': 'aleph0',
	'ℵ₁': 'aleph1',
	'ℵ₂': 'aleph2',
}

const DECODE_MAP: Record<string, string> = {
	_: ' ',
	aleph0: 'ℵ₀',
	aleph1: 'ℵ₁',
	aleph2: 'ℵ₂',
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

export function get_property_url(id: string, type: StructureType) {
	return `/${type}-property/${encode_property_ID(id)}`
}
