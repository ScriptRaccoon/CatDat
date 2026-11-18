import { test, expect } from '@playwright/test'

test('user can navigate to a morphism', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'morphisms',
			exact: true
		})
		.first()
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'List of morphisms',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism-list')

	await page
		.getByRole('link', {
			name: 'universal split epimorphism',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'universal split epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism/universal-split-epi')
})

test("user can navigate to morphisms tagged with 'algebra' from the morphism list page", async ({
	page
}) => {
	await page.goto('/morphism-list', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'algebra',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Morphisms tagged with 'algebra'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'embedding of integers into rational numbers',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to morphisms tagged with 'set theory' from the morphism detail page", async ({
	page
}) => {
	await page.goto('/morphism/id_X', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'set theory',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Morphisms tagged with 'set theory'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'map into the singleton set',
			exact: true
		})
	).toBeVisible()
})
