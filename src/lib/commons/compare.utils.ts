import { browser } from '$app/environment'
import type { StructureType } from './types'
import { is_string_array } from './utils'

export const MAX_STRUCTURES_COMPARE = 10

export function get_compared_structures(type: StructureType): string[] {
	if (!browser) return []

	const names_string = window.sessionStorage.getItem(`comparison:${type}`)
	if (!names_string) return []

	try {
		const parsed_names: unknown = JSON.parse(names_string)
		const is_valid = is_string_array(parsed_names)
		return is_valid ? parsed_names : []
	} catch {
		console.error('Error parsing saved structured from sessionStorage')
		return []
	}
}

export function save_comparison(type: StructureType, compared_categories: string[]) {
	if (!browser) return

	window.sessionStorage.setItem(
		`comparison:${type}`,
		JSON.stringify(compared_categories)
	)
}
