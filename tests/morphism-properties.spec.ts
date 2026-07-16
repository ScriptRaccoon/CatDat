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

test('user can view morphism property details', async ({ page }) => {
	await page.goto('/morphism-property/effective_epimorphism')

	await expect(
		page.getByRole('heading', {
			name: 'effective epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText('is an effective epimorphism if')).toBeVisible()

	await expect(
		page
			.getByRole('link', {
				name: 'regular epimorphism',
				exact: true
			})
			.first()
	).toBeVisible()

	const examples = page
		.getByRole('heading', {
			name: 'Examples',
			exact: true
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		examples.getByRole('link', {
			name: 'identity map of a group',
			exact: true
		})
	).toBeVisible()

	await expect(
		examples.getByRole('link', {
			name: 'reduction modulo p',
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
			name: 'embedding of A3 into S3',
			exact: true
		})
	).toBeVisible()

	await expect(
		counterexamples.getByRole('link', {
			name: 'universal split epimorphism',
			exact: true
		})
	).toBeVisible()
})

test('user can navigate to the dual property', async ({ page }) => {
	await page.goto('/morphism-property/strict_epimorphism')

	await expect(
		page.getByRole('heading', {
			name: 'strict epimorphism',
			exact: true
		})
	).toBeVisible()

	const item = page.locator('li', {
		hasText: 'Dual property'
	})

	await item
		.getByRole('link', {
			name: 'strict monomorphism',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'strict monomorphism',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism-property/strict_monomorphism')
})

test('user sees no unknown morphisms for the property of being an isomorphism', async ({
	page
}) => {
	await page.goto('/morphism-property/isomorphism')
	await expect(
		page.getByText(
			'There are 0 morphisms for which the database has no information on whether they satisfy this property'
		)
	).toBeVisible()
})

test("user can navigate to properties tagged with 'types of epimorphism' from the property list page", async ({
	page
}) => {
	await page.goto('/morphism-properties', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
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
		.getByRole('button', {
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
