import { test, expect } from '@playwright/test'

// This test file does not cover all features of symmetric monoidal categories,
// but only a selection. The other features are covered sufficiently by the
// test cases for the other types of categorical structures.

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

test('user can view symmetric monoidal category details', async ({ page }) => {
	await page.goto('/symmetric_monoidal_category/Ab_tensor')

	await expect(
		page.getByRole('heading', {
			name: 'symmetric monoidal category of abelian groups',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('tensor product of abelian groups')
	await expect(body).toContainText('is closed')
	await expect(body).toContainText('is cocomplete')
	await expect(body).toContainText('is not strict')
	await expect(body).toContainText('is not cartesian')
})

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
