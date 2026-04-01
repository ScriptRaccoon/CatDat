import { browser } from '$app/environment'

export const CATEGORY_DETAIL_LEVELS = {
	all: 'Show all properties for a category. Indicate which properties are in the database and which have been deduced. This is the default.',
	merged: "Show all properties for a category, but don't indicate which properties are in the database and which have been deduced.",
	basic: 'Show only those properties for a category that are in the database. Deduced properties are not shown.',
} as const

type CategoryDetailLevel = keyof typeof CATEGORY_DETAIL_LEVELS

function is_valid_category_detail_level(
	level: string | null,
): level is CategoryDetailLevel {
	return level != null && Object.keys(CATEGORY_DETAIL_LEVELS).includes(level)
}

const DEFAULT_CATEGORY_DETAIL_LEVEL: CategoryDetailLevel = 'all'

export const category_detail_level = $state<{ value: CategoryDetailLevel }>({
	value: get_saved_category_detail_level(),
})

function get_saved_category_detail_level(): CategoryDetailLevel {
	if (!browser) return DEFAULT_CATEGORY_DETAIL_LEVEL
	const saved_category_detail_level = localStorage.getItem('category_detail_level')

	return is_valid_category_detail_level(saved_category_detail_level)
		? saved_category_detail_level
		: DEFAULT_CATEGORY_DETAIL_LEVEL
}

export function update_category_detail_level(level: CategoryDetailLevel) {
	if (!browser) return
	localStorage.setItem('category_detail_level', level)
}
