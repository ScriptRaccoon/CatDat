import { normalize_text } from '#shared/utils.ts'
import type {
	AssignmentStatus,
	PropertyLookupItem,
	PropertyShort,
	StructureLookupItem,
	StructureShort
} from '#lib/commons/types.ts'
import type { Attachment } from 'svelte/attachments'

export function get_device_type() {
	const w = window.innerWidth
	if (w < 640) return 'mobile'
	if (w < 1024) return 'tablet'
	return 'desktop'
}

export function get_comparison_score(value: string, query: string) {
	if (!query) return -1
	const v = normalize_text(value)
	const q = normalize_text(query)
	if (v === q) return 3
	if (v.startsWith(q)) return 2
	if (v.includes(q)) return 1
	return 0
}

/**
 * Returns the items with a positive score, sorted by descending score
 * and then alphabetically by their label.
 */
export function rank_by_score<T>(
	items: readonly T[],
	get_score: (item: T) => number,
	get_label: (item: T) => string
): T[] {
	return items
		.map((item) => ({ item, score: get_score(item) }))
		.filter(({ score }) => score > 0)
		.sort(
			(a, b) =>
				b.score - a.score || get_label(a.item).localeCompare(get_label(b.item))
		)
		.map(({ item }) => item)
}

export function to_property_lookup_item(
	property: PropertyShort & { proof?: string },
	status: AssignmentStatus
): PropertyLookupItem {
	return {
		id: property.id,
		relation: property.relation,
		proof: property.proof ?? null,
		status
	}
}

export function to_structure_lookup_item(
	structure: StructureShort,
	status: AssignmentStatus
): StructureLookupItem {
	return { id: structure.id, name: structure.name, status }
}

/**
 * Returns the structures whose name or one of whose keywords contains the
 * search text.
 */
export function search_structures<T extends StructureShort>(
	structures: T[],
	search: string,
	keywords: Record<string, string[]>
): T[] {
	const query = normalize_text(search)
	return structures.filter((structure) =>
		[structure.name, ...(keywords[structure.id] ?? [])].some((text) =>
			normalize_text(text).includes(query)
		)
	)
}

export const resize_textarea: Attachment = (textarea) => {
	if (!(textarea instanceof HTMLTextAreaElement)) return

	textarea.style.height = `${textarea.scrollHeight}px`
	textarea.style.overflowY = 'hidden'

	const adjust = () => {
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`
	}

	textarea.addEventListener('input', adjust)

	return () => {
		textarea.removeEventListener('input', adjust)
	}
}
