import { test, expect } from '@playwright/test'

test('user can navigate to a category property', async ({ page }) => {
	await page.goto('/')

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
			name: 'Properties of categories',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category-properties')

	await page
		.getByRole('link', {
			name: 'finitely accessible',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'finitely accessible',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category-property/finitely_accessible')
})

test('user can search for a category property by its keyword', async ({ page }) => {
	await page.goto('/category-properties', { waitUntil: 'networkidle' })

	await page.getByRole('searchbox', { name: 'search filter' }).fill('aleph1-accessible')

	await expect(
		page.getByRole('link', { name: 'ℵ₁-accessible', exact: true })
	).toBeVisible()

	await expect(
		page.getByRole('link', { name: 'accessible', exact: true })
	).not.toBeVisible()
})

test('user can search for a category property by a keyword of its dual', async ({
	page
}) => {
	await page.goto('/category-properties', { waitUntil: 'networkidle' })

	await page.getByRole('searchbox', { name: 'search filter' }).fill('inverse limits')

	await expect(
		page.getByRole('link', { name: 'directed colimits', exact: true })
	).toBeVisible()

	await expect(
		page.getByRole('link', { name: 'directed limits', exact: true })
	).toBeVisible()

	await expect(
		page.getByRole('link', { name: 'inverse', exact: true })
	).not.toBeVisible()
})

test("user can navigate to properties tagged with 'colimits' from the property list page", async ({
	page
}) => {
	await page.goto('/category-properties', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'colimits',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Properties of categories tagged with 'colimits'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'pushouts',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'finitely cocomplete',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to properties tagged with 'topos theory' from the property detail page", async ({
	page
}) => {
	await page.goto('/category-property/cartesian_closed', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'topos theory',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Properties of categories tagged with 'topos theory'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'pretopos',
			exact: true
		})
	).toBeVisible()
})
