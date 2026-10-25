import type { Page } from '@playwright/test'

/**
 * Returns a list of properties on a structure detail page, e.g. the list
 * "Deduced properties" in the section "Satisfied properties".
 */
export function get_property_list(page: Page, section: string, list: string) {
	return page
		.locator('section', {
			has: page.getByRole('heading', { name: section, exact: true })
		})
		.getByRole('list', { name: list, exact: true })
}
