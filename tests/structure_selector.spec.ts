import { test, expect } from '@playwright/test'

test('categories are selected by default', async ({ page }) => {
	await page.goto('/')

	const selector = page.getByRole('combobox', {
		name: 'Structure',
		exact: true
	})

	await expect(selector).toBeVisible()
	await expect(selector).toHaveValue('category')
})

test('user can switch to functors', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	const selector = page.getByRole('combobox', {
		name: 'Structure',
		exact: true
	})

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

	const selector = page.getByRole('combobox', {
		name: 'Structure',
		exact: true
	})

	await expect(selector).toBeVisible()
	await expect(selector).toHaveValue('functor')
})

test('user can switch to morphisms', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	const selector = page.getByRole('combobox', {
		name: 'Structure',
		exact: true
	})

	await expect(selector).toBeVisible()
	await selector.selectOption('morphism')

	await expect(selector).toHaveValue('morphism')

	await expect(page).toHaveURL('/morphism-list')

	await expect(
		page.getByRole('heading', {
			name: 'List of morphisms',
			exact: true
		})
	).toBeVisible()
})

test('morphisms are selected on a morphism route', async ({ page }) => {
	await page.goto('/morphism-properties')

	const selector = page.getByRole('combobox', {
		name: 'Structure',
		exact: true
	})

	await expect(selector).toBeVisible()
	await expect(selector).toHaveValue('morphism')
})

test('user can switch to symmetric monoidal categories', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	const selector = page.getByRole('combobox', {
		name: 'Structure',
		exact: true
	})

	await expect(selector).toBeVisible()
	await selector.selectOption('symmetric_monoidal_category')

	await expect(selector).toHaveValue('symmetric_monoidal_category')

	await expect(page).toHaveURL('/symmetric_monoidal_category-list')

	await expect(
		page.getByRole('heading', {
			name: 'List of symmetric monoidal categories',
			exact: true
		})
	).toBeVisible()
})

test('symmetric monoidal categories are selected on a symmetric monoidal category route', async ({
	page
}) => {
	await page.goto('/symmetric_monoidal_category-properties')

	const selector = page.getByRole('combobox', {
		name: 'Structure',
		exact: true
	})

	await expect(selector).toBeVisible()
	await expect(selector).toHaveValue('symmetric_monoidal_category')
})
