import { browser } from '$app/env'

const allow = browser && !localStorage.getItem('notrack')

export const tracking = $state({ allow })

export function set_tracking(allow: boolean) {
	if (!browser) return
	tracking.allow = allow
	if (allow) {
		localStorage.removeItem('notrack')
	} else {
		localStorage.setItem('notrack', '1')
	}
}
