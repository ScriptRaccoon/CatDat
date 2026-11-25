import type { StructureType } from './config'

const ENCODE_MAP: Record<string, string> = {
	' ': '_',
	'ℵ₀': 'aleph0',
	'ℵ₁': 'aleph1',
	'ℵ₂': 'aleph2'
}

const DECODE_MAP: Record<string, string> = {
	_: ' ',
	aleph0: 'ℵ₀',
	aleph1: 'ℵ₁',
	aleph2: 'ℵ₂'
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

/**
 * Returns a link to the proof of a property, or of a special morphism
 * classification, on a structure page. The link cites only the statement,
 * so the proof may be deduced.
 */
export function get_proof_link(type: StructureType, structure_id: string, key: string) {
	return `<a href="/${type}/${structure_id}?proof=${encode_property_ID(key)}" data-allow-deduced>proof</a>`
}

export function get_property_label(id: string) {
	return id.replace(/^preserves\s/, '')
}

/**
 * Returns the claim that a structure with the given notation satisfies
 * (or does not satisfy, depending on the relation) a property, or that
 * this cannot be decided.
 */
export function get_claim(
	notation: string,
	relation: string,
	property_id: string,
	is_undecidable = false
) {
	const claim = `${notation} ${relation} ${get_property_label(property_id)}`
	return is_undecidable ? `It cannot be decided whether ${claim}` : claim
}

export function get_special_morphism_plural(kind: string) {
	return `${kind}s`
}
