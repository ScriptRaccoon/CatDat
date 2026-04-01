import { browser } from '$app/environment'
import { is_string_array } from '$lib/commons/utils'
import { COMPARISON_STORAGE_KEY } from './compare.config'

export function get_compared_categories(): string[] {
	if (!browser) return []

	const names_string = window.sessionStorage.getItem(COMPARISON_STORAGE_KEY)
	if (!names_string) return []

	try {
		const parsed_names: unknown = JSON.parse(names_string)
		const is_valid = is_string_array(parsed_names)
		return is_valid ? parsed_names : []
	} catch {
		console.error('Error parsing saved categories from sessionStorage')
		return []
	}
}

export function save_comparison(compared_categories: string[]) {
	if (!browser) return

	window.sessionStorage.setItem(
		COMPARISON_STORAGE_KEY,
		JSON.stringify(compared_categories),
	)
}
