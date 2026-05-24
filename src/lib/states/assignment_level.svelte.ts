import { browser } from '$app/environment'

export const ASSIGNMENT_LEVELS = {
	all: 'Show all properties for a structure. Indicate which properties have been manually assigned and which have been deduced. This is the default.',
	merged: "Show all properties for a structure, but don't indicate which properties are manually assigned and which have been deduced.",
	basic: 'Show only those properties for a structure that have been manually assigned. Deduced properties are not shown.',
} as const

type AssignmentLevel = keyof typeof ASSIGNMENT_LEVELS

function is_valid_assignment_level(level: string | null): level is AssignmentLevel {
	return level != null && Object.keys(ASSIGNMENT_LEVELS).includes(level)
}

const DEFAULT_ASSIGNMENT_LEVEL: AssignmentLevel = 'all'

export const assignment_level = $state<{ value: AssignmentLevel }>({
	value: get_saved_assignment_level(),
})

function get_saved_assignment_level(): AssignmentLevel {
	if (!browser) return DEFAULT_ASSIGNMENT_LEVEL
	const saved_assignment_level = localStorage.getItem('assignment_level')

	return is_valid_assignment_level(saved_assignment_level)
		? saved_assignment_level
		: DEFAULT_ASSIGNMENT_LEVEL
}

export function update_assignment_level(level: AssignmentLevel) {
	if (!browser) return
	localStorage.setItem('assignment_level', level)
}
