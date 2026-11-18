import { test, expect } from '@playwright/test'

test('user can navigate to a related morphism', async ({ page }) => {
	await page.goto('/morphism/id_X', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Related") + span')
		.getByRole('link', {
			name: 'identity map of a group',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'identity map of a group',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism/id_G')
})

test('user can navigate to the ambient category', async ({ page }) => {
	await page.goto('/morphism/fork-handle', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Category") + span')
		.getByRole('link', {
			name: 'walking fork',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'walking fork',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/walking_fork')
})
