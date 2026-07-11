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

test('user can view category property details', async ({ page }) => {
	await page.goto('/category-property/finitely_accessible')

	await expect(
		page.getByRole('heading', {
			name: 'finitely accessible',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText('A category is finitely accessible if')).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'accessible',
			exact: true
		})
	).toBeVisible()

	const examples = page
		.getByRole('heading', {
			name: 'Examples',
			exact: true
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		examples.getByRole('link', {
			name: 'category of fields',
			exact: true
		})
	).toBeVisible()

	await expect(
		examples.getByRole('link', {
			name: 'category of vector spaces',
			exact: true
		})
	).toBeVisible()

	const counterexamples = page
		.getByRole('heading', {
			name: 'Counterexamples',
			exact: true
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		counterexamples.getByRole('link', {
			name: 'category of finite sets',
			exact: true
		})
	).toBeVisible()

	await expect(
		counterexamples.getByRole('link', {
			name: 'category of topological spaces',
			exact: true
		})
	).toBeVisible()
})

test('user sees no unknown categories for the property of being additive', async ({
	page
}) => {
	await page.goto('/category-property/additive')
	await expect(
		page.getByText(
			'There are 0 categories for which the database has no information on whether they satisfy this property'
		)
	).toBeVisible()
})

test("user can navigate to properties tagged with 'colimits' from the property list page", async ({
	page
}) => {
	await page.goto('/category-properties', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
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
		.getByRole('button', {
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
