import type { Attachment } from 'svelte/attachments'

/**
 * Used to determine the modifier key for keyboard shortcuts, see
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform.
 */
function is_apple_device() {
	return /^(Mac|iPhone|iPad)/.test(navigator.platform)
}

export function get_shortcut_label() {
	return is_apple_device() ? '⌘K' : 'Ctrl K'
}

/**
 * On Apple devices, Ctrl+K is not used since it deletes the text
 * after the cursor there.
 */
function is_shortcut(e: KeyboardEvent) {
	if (e.key.toLowerCase() !== 'k' || e.shiftKey || e.altKey) return false
	return is_apple_device() ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey
}

/**
 * Focuses the input and selects its text when Cmd+K (on Apple devices)
 * or Ctrl+K (on other devices) is pressed. There should be only one such
 * input on every page.
 */
export function focus_on_shortcut(before_focus?: () => void): Attachment {
	return (input) => {
		if (!(input instanceof HTMLInputElement)) return

		const handle_keydown = (e: KeyboardEvent) => {
			if (!is_shortcut(e)) return
			e.preventDefault()
			before_focus?.()
			input.focus()
			input.select()
		}

		input.setAttribute(
			'aria-keyshortcuts',
			is_apple_device() ? 'Meta+K' : 'Control+K'
		)
		document.addEventListener('keydown', handle_keydown)

		return () => {
			input.removeAttribute('aria-keyshortcuts')
			document.removeEventListener('keydown', handle_keydown)
		}
	}
}
