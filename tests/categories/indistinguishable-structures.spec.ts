import { test, expect } from '@playwright/test'

test('user sees no indistinguishable categories for the category of sets', async ({
	page
}) => {
	await page.goto('/category/Set')

	await expect(
		page.getByRole('heading', { name: 'category of sets', exact: true })
	).toBeVisible()

	await expect(
		page.getByRole('heading', { name: 'Indistinguishable categories', exact: true })
	).toHaveCount(0)
})

// this can be changed as soon as a property distinguishes Bin from Bin_symm
test('user sees indistinguishable categories on the category page', async ({ page }) => {
	await page.goto('/category/Bin')

	await expect(
		page.getByRole('heading', { name: 'Indistinguishable categories', exact: true })
	).toBeVisible()

	const list = page.getByRole('list', {
		name: 'Indistinguishable categories',
		exact: true
	})

	await list
		.getByRole('link', {
			name: 'category of sets equipped with a symmetric binary relation',
			exact: true
		})
		.click()

	await expect(page).toHaveURL('/category/Bin_symm')
})

// this can be changed as soon as a property distinguishes Bin from Bin_symm
test('user sees indistinguishable category pairs on the page with missing data', async ({
	page
}) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Indistinguishable category pairs',
			exact: true
		})
	})

	await expect(section).toBeVisible()

	const pair = section.getByRole('listitem').filter({
		has: page.getByRole('link', {
			name: 'category of sets equipped with a binary relation',
			exact: true
		})
	})

	await expect(
		pair.getByRole('link', {
			name: 'category of sets equipped with a symmetric binary relation',
			exact: true
		})
	).toBeVisible()
})
