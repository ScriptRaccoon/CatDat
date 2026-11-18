import { test, expect } from '@playwright/test'

test('user can navigate to a symmetric monoidal category', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'symmetric monoidal categories',
			exact: true
		})
		.first()
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'List of symmetric monoidal categories',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/symmetric_monoidal_category-list')

	await page
		.getByRole('link', {
			name: 'symmetric monoidal category of abelian groups',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'symmetric monoidal category of abelian groups',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/symmetric_monoidal_category/Ab_tensor')
})
