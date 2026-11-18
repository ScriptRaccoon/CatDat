import { test, expect } from '@playwright/test'

test('user can navigate to the underlying category', async ({ page }) => {
	await page.goto('/symmetric_monoidal_category/Set_cartesian', {
		waitUntil: 'networkidle'
	})

	await page
		.locator('strong:has-text("Underlying category") + span')
		.getByRole('link', {
			name: 'category of sets',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of sets',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Set')
})
