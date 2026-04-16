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

export function string_to_color(str: string): string {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}

	const h = hash % 360
	return `hsl(${h}, 80%, 50%)`
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

export function strip_html_tags(input: string): string {
	return input.replace(/<[^>]*>/g, '')
}
