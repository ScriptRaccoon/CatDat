import { test, expect } from '@playwright/test'

test('user can navigate to a functor implication', async ({ page }) => {
	await page.goto('/functor-list')

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
			name: 'Functor implications',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-implications')

	const item = page.locator('li', { hasText: /fully faithful.+conservative/ })

	await expect(item).toBeVisible()

	await item.getByRole('link', { name: 'details' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-implication/conservative_criterion')
})

test('user can see the details of an implication', async ({ page }) => {
	await page.goto('/functor-implication/conservative_criterion')

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'fully faithful',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'conservative',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText(/Proof:.+follows that/)).toBeVisible()
})

test('user can open the list of deduced implications', async ({ page }) => {
	await page.goto('/functor-implications', { waitUntil: 'networkidle' })

	await expect(page.locator('li', { hasText: /monadic.+right adjoint/ })).toBeVisible()

	await expect(page.locator('li', { hasText: /comonadic.+left adjoint/ })).toHaveCount(
		0
	)

	await page
		.getByRole('button', {
			name: 'Show deduced implications',
			exact: true
		})
		.click()

	await expect(page.locator('li', { hasText: /comonadic.+left adjoint/ })).toBeVisible()
})
