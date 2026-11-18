import { test, expect } from '@playwright/test'

test('user can navigate to a functor property', async ({ page }) => {
	await page.goto('/functor-list')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Properties',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Properties of functors',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-properties')

	await page
		.getByRole('link', {
			name: 'faithful',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'faithful',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-property/faithful')
})

test('user can search for a functor property by its keyword', async ({ page }) => {
	await page.goto('/functor-properties', { waitUntil: 'networkidle' })

	await page.getByRole('searchbox', { name: 'search filter' }).fill('tripleable')

	await expect(page.getByRole('link', { name: 'monadic', exact: true })).toBeVisible()

	await expect(
		page.getByRole('link', { name: 'faithful', exact: true })
	).not.toBeVisible()
})

test("user can navigate to properties tagged with 'adjunctions' from the property list page", async ({
	page
}) => {
	await page.goto('/functor-properties', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'adjunctions',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Properties of functors tagged with 'adjunctions'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'right adjoint',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'reflector',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to properties tagged with 'colimit preservation' from the property detail page", async ({
	page
}) => {
	await page.goto('/functor-property/finitary', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'colimit preservation',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Properties of functors tagged with 'colimit preservation'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'right exact',
			exact: true
		})
	).toBeVisible()
})
