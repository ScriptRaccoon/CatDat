import { is_object } from '#shared/utils.ts'
import { render_formulas } from '#lib/server/formulas.ts'

const EXTERNAL_LINK_REGEX = /<a\s+href="(https?:\/\/[^"]*)"/g

function open_external_links_in_new_tab(txt: string): string {
	return txt.replace(EXTERNAL_LINK_REGEX, '<a href="$1" target="_blank"')
}

const PROOF_LINK_REGEX = /<a\s+href="(\/[^"]*\?proof=[^"]*)"/g

/**
 * Links to proofs open the proof in the popup and scroll the page to
 * its property, so the scroll reset by SvelteKit is turned off.
 * Otherwise, the page jumps to the top before scrolling to the property.
 */
function keep_scroll_on_proof_links(txt: string): string {
	return txt.replace(PROOF_LINK_REGEX, '<a href="$1" data-sveltekit-reset="false"')
}

function render_text(txt: string): string {
	const with_line_breaks = txt.replaceAll('\n', '<span class="paragraph-break"></span>')
	const with_link_targets = open_external_links_in_new_tab(with_line_breaks)
	const with_proof_links = keep_scroll_on_proof_links(with_link_targets)
	return render_formulas(with_proof_links)
}

export function render_nested_text<T>(obj: T): T {
	if (!obj) return obj

	if (typeof obj === 'string') {
		return render_text(obj) as T
	}

	if (Array.isArray(obj)) {
		return obj.map(render_nested_text) as T
	}

	if (is_object(obj)) {
		const result: Record<string, unknown> = {}
		for (const key in obj) {
			result[key] = render_nested_text(obj[key])
		}
		return result as T
	}

	return obj
}
