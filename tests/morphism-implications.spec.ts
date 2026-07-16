import { test, expect } from '@playwright/test'

test('user can navigate to a morphism implication', async ({ page }) => {
	await page.goto('/morphism-list')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Implications',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Morphism implications',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism-implications')

	const item = page.locator('li', {
		hasText: /split monomorphism.+regular monomorphism/
	})

	await expect(item).toBeVisible()

	await item.getByRole('link', { name: 'details' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism-implication/split_mono_is_regular_mono')
})

test('user can see the details of an implication', async ({ page }) => {
	await page.goto('/morphism-implication/split_mono_is_regular_mono')

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'split monomorphism',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'regular monomorphism',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText('Proof: Let')).toBeVisible()
})

test('user can open the list of deduced implications', async ({ page }) => {
	await page.goto('/morphism-implications', { waitUntil: 'networkidle' })

	await expect(
		page.locator('li', { hasText: /normal monomorphism.+regular monomorphism/ })
	).toBeVisible()

	await expect(
		page.locator('li', { hasText: /normal epimorphism.+regular epimorphism/ })
	).toHaveCount(0)

	await page
		.getByRole('button', {
			name: 'Show deduced implications',
			exact: true
		})
		.click()

	await expect(
		page.locator('li', { hasText: /normal epimorphism.+regular epimorphism/ })
	).toBeVisible()
})
