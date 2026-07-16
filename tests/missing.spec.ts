import { test, expect } from '@playwright/test'

test('user can navigate to the page with missing data', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'Missing data',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/missing')
})

// this can be adjusted if at some point in the future everything is known,
// but that is unlikely
test('user can see categories with missing data', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	const categories_section = page.locator('section', {
		hasText: 'Categories with unknown properties'
	})

	await expect(categories_section).toBeVisible()

	const link = categories_section.getByRole('link').first()

	await expect(link).toBeVisible()

	await link.click()

	await page.waitForURL('/category/*')
})

// this can be adjusted if at some point in the future a functor
// is not fully understood anymore
test('user can see no functors with missing data', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	const functors_section = page.locator('section', {
		hasText: 'Functors with unknown properties'
	})

	await expect(functors_section.getByRole('link')).toHaveCount(0)
})

// this can be adjusted if at some point in the future a morphism
// is not fully understood anymore
test('user can see no morphisms with missing data', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	const morphisms_section = page.locator('section', {
		hasText: 'Morphisms with unknown properties'
	})

	await expect(morphisms_section.getByRole('link')).toHaveCount(0)
})

test('user can see missing category combinations', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const combinations_section = page.locator('section', {
		hasText: 'Missing category combinations'
	})

	await expect(combinations_section).toBeVisible()

	await combinations_section
		.locator('summary', { hasText: /Show all \d+ combinations/ })
		.click()

	await expect(
		combinations_section.locator('li', { hasText: /[A-Za-z]+ ∧ ¬[A-Za-z]+/ }).first()
	).toBeVisible()
})

test('user can see missing functor combinations', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const combinations_section = page.locator('section', {
		hasText: 'Missing functor combinations'
	})

	await expect(combinations_section).toBeVisible()

	await combinations_section
		.locator('summary', { hasText: /Show all \d+ combinations/ })
		.click()

	await expect(
		combinations_section.locator('li', { hasText: /[A-Za-z]+ ∧ ¬[A-Za-z]+/ }).first()
	).toBeVisible()
})
