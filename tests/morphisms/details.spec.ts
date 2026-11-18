import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can view morphism details', async ({ page }) => {
	await page.goto('/morphism/universal-split-epi')

	await expect(
		page.getByRole('heading', {
			name: 'universal split epimorphism',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('basic example of a split epimorphism')
	await expect(
		get_property_list(page, 'Satisfied properties', 'Assigned properties')
	).toContainText('is a split epimorphism')
	await expect(
		get_property_list(page, 'Satisfied properties', 'Deduced properties')
	).toContainText('is a regular epimorphism')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Assigned properties')
	).toContainText('is not an effective epimorphism')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
	).toContainText('is not an isomorphism')
})

test('user sees no unknown properties for the terminal map', async ({ page }) => {
	await page.goto('/morphism/terminal-map')

	await expect(
		page.getByRole('list', { name: 'Unknown properties', exact: true })
	).toHaveCount(0)
})
