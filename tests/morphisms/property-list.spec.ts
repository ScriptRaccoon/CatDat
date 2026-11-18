import { test, expect } from '@playwright/test'

test('user can navigate to a morphism property', async ({ page }) => {
	await page.goto('/morphism-list')

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
			name: 'Properties of morphisms',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism-properties')

	await page
		.getByRole('link', {
			name: 'effective epimorphism',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'effective epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism-property/effective_epimorphism')
})

test("user can navigate to properties tagged with 'types of epimorphism' from the property list page", async ({
	page
}) => {
	await page.goto('/morphism-properties', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'types of epimorphisms',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Properties of morphisms tagged with 'types of epimorphisms'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'regular epimorphism',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to properties tagged with 'types of monomorphisms' from the property detail page", async ({
	page
}) => {
	await page.goto('/morphism-property/regular_monomorphism', {
		waitUntil: 'networkidle'
	})

	await page
		.getByRole('link', {
			name: 'types of monomorphisms',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Properties of morphisms tagged with 'types of monomorphisms'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'split monomorphism',
			exact: true
		})
	).toBeVisible()
})
