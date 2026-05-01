import { goto } from '$app/navigation'
import type { Attachment } from 'svelte/attachments'

export function get_device_type() {
	const w = window.innerWidth
	if (w < 640) return 'mobile'
	if (w < 1024) return 'tablet'
	return 'desktop'
}

export function filter_by_tag(tag: string) {
	goto(`/categories/${tag}`)
}

export function pluralize(count: number, forms: { one: string; other: string }) {
	const word = count === 1 ? forms.one : forms.other
	return word.replace('{count}', String(count))
}

/**
 * Removes accents from letters and transforms to lowercase
 */
export function normalize_text(txt: string) {
	return txt
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
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
