import { test, expect } from '@playwright/test'

test('user can view category property details', async ({ page }) => {
	await page.goto('/category-property/finitely_accessible')

	await expect(
		page.getByRole('heading', {
			name: 'finitely accessible',
			exact: true
		})
	).toBeVisible()

	await expect(page.locator('body')).toContainText(
		'A category is finitely accessible if'
	)

	const related_link = page
		.locator('strong:has-text("Related") + span')
		.getByRole('link', {
			name: 'accessible',
			exact: true
		})

	await expect(related_link).toBeVisible()

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

	await expect(
		page.getByRole('heading', {
			name: 'Undecidable implications',
			exact: true
		})
	).toBeVisible()
})

test('user can navigate to the dual property', async ({ page }) => {
	await page.goto('/category-property/equalizers')

	await expect(
		page.getByRole('heading', {
			name: 'equalizers',
			exact: true
		})
	).toBeVisible()

	await page
		.locator('strong:has-text("Dual") + span')
		.getByRole('link', {
			name: 'coequalizers',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'coequalizers',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category-property/coequalizers')
})

test('user sees no unknown categories for the property of being additive', async ({
	page
}) => {
	await page.goto('/category-property/additive')

	await expect(page.locator('body')).toContainText(
		'There are 0 categories for which the database has no information on whether they satisfy this property'
	)
})

test('user can view undecidable implications of a category property', async ({
	page
}) => {
	await page.goto('/category-property/accessible', { waitUntil: 'networkidle' })

	const implications = page.getByRole('list', { name: 'Undecidable implications' })

	const item = implications.getByRole('listitem').filter({
		hasText: /^\s*accessible\s+implies\s+well-copowered\s*$/
	})

	await expect(
		item.getByRole('link', { name: 'accessible', exact: true })
	).toBeVisible()

	await item.getByRole('button', { name: 'Show proof' }).click()

	await expect(page).toHaveURL(
		'/category-property/accessible?proof=accessible_well-copowered_undecidable'
	)

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText('Vopěnka')
})

test('user can see which subcategories inherit a category property', async ({ page }) => {
	const inheritance = page.locator('strong:has-text("Inheritance") + span')

	await page.goto('/category-property/thin')
	await expect(inheritance).toHaveText('is inherited by subcategories')

	await page.goto('/category-property/groupoid')
	await expect(inheritance).toHaveText('is inherited by full subcategories')

	await page.goto('/category-property/strongly_connected')
	await expect(inheritance).toHaveText('is inherited by inhabited full subcategories')

	await page.goto('/category-property/complete')
	await expect(inheritance).toHaveCount(0)
})
