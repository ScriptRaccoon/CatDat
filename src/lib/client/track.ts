import { browser } from '$app/environment'
import { PUBLIC_ADMIN_URL } from '$env/static/public'
import { theme } from '$lib/states/theme.svelte'
import { get_device_type } from './utils'

export async function track_visit() {
	if (!browser) return
	if (sessionStorage.getItem('visit-tracked')) return

	const res = await fetch(`${PUBLIC_ADMIN_URL}/api/track`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			device_type: get_device_type(),
			theme: theme.value
		})
	})

	if (res.ok) sessionStorage.setItem('visit-tracked', '1')
}
