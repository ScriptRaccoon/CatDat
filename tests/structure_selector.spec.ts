import { test, expect } from '@playwright/test'

test('categories are selected by default', async ({ page }) => {
	await page.goto('/')

	const selector = page
		.getByRole('combobox', {
			name: 'Structure',
			exact: true
		})
		.first()

	await expect(selector).toBeVisible()
	await expect(selector).toHaveValue('category')
})

test('user can switch to functors', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	const selector = page
		.getByRole('combobox', {
			name: 'Structure',
			exact: true
		})
		.first()

	await expect(selector).toBeVisible()
	await selector.selectOption('functor')

	await expect(selector).toHaveValue('functor')

	await expect(page).toHaveURL('/functor-list')

	await expect(
		page.getByRole('heading', {
			name: 'List of functors',
			exact: true
		})
	).toBeVisible()
})

test('functors are selected on a functor route', async ({ page }) => {
	await page.goto('/functor-properties')

	const selector = page
		.getByRole('combobox', {
			name: 'Structure',
			exact: true
		})
		.first()

	await expect(selector).toBeVisible()
	await expect(selector).toHaveValue('functor')
})
