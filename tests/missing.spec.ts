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

// this can be adjusted if at some point all categories are understood
test('user can see categories with missing data', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	const categories_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Categories with unknown properties',
			exact: true
		})
	})

	await expect(categories_section).toBeVisible()

	const link = categories_section.getByRole('link').first()

	await expect(link).toBeVisible()

	await link.click()

	await page.waitForURL('/category/*')
})

// this can be adjusted if at some point not all functors are understood
test('user cannot see any functors with missing data', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	const functors_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Functors with unknown properties',
			exact: true
		})
	})

	await expect(functors_section).toBeVisible()

	await expect(functors_section.getByRole('link')).toHaveCount(0)
})

// this can be adjusted if at some point not all morphisms are understood
test('user cannot see any morphisms with missing data', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	const morphisms_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Morphisms with unknown properties',
			exact: true
		})
	})

	await expect(morphisms_section).toBeVisible()

	await expect(morphisms_section.getByRole('link')).toHaveCount(0)
})

// this can be adjusted if at some point not all
// symmetric monoidal categories are understood
test('user cannot see any symmetric monoidal categories with missing data', async ({
	page
}) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Missing data',
			exact: true
		})
	).toBeVisible()

	const symmetric_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Symmetric monoidal categories with unknown properties',
			exact: true
		})
	})

	await expect(symmetric_section).toBeVisible()

	await expect(symmetric_section.getByRole('link')).toHaveCount(0)
})

// this can be adjusted if at some point every category combination is witnessed
test('user can see missing category combinations', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const combinations_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Missing category combinations',
			exact: true
		})
	})

	await expect(combinations_section).toBeVisible()

	await expect(combinations_section).not.toHaveText(
		/Every consistent category property combination[\s\S]+is witnessed/
	)

	await combinations_section
		.locator('summary', { hasText: /Show all \d+ combinations/ })
		.click()

	await expect(
		combinations_section.locator('li', { hasText: /[A-Za-z]+ ∧ ¬[A-Za-z]+/ }).first()
	).toBeVisible()
})

// this can be adjusted if at some point a functor combination is not witnessed
test('user cannot see any missing functor combinations', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const combinations_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Missing functor combinations',
			exact: true
		})
	})

	await expect(combinations_section).toBeVisible()

	await expect(combinations_section).toHaveText(
		/Every consistent functor property combination[\s\S]+is witnessed/
	)
})

// this can be adjusted if at some point a morphism combination is not witnessed
test('user cannot see any missing morphism combinations', async ({ page }) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const combinations_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Missing morphism combinations',
			exact: true
		})
	})

	await expect(combinations_section).toBeVisible()

	await expect(combinations_section).toHaveText(
		/.+Every consistent morphism property combination[\s\S]+is witnessed/
	)
})

// this can be adjusted if at some point every symmetric monoidal category
// combination is witnessed
test('user can see missing symmetric monoidal category combinations', async ({
	page
}) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const combinations_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Missing symmetric monoidal category combinations',
			exact: true
		})
	})

	await expect(combinations_section).toBeVisible()

	await expect(combinations_section).not.toHaveText(
		/Every consistent symmetric monoidal category property combination[\s\S]+is witnessed/
	)

	await combinations_section
		.locator('summary', { hasText: /Show all \d+ combinations/ })
		.click()

	await expect(
		combinations_section.locator('li', { hasText: /[A-Za-z]+ ∧ ¬[A-Za-z]+/ }).first()
	).toBeVisible()
})
