import { test, expect } from '@playwright/test'

test('user can navigate to a category implication', async ({ page }) => {
	await page.goto('/')

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
			name: 'Category implications',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category-implications')

	const item = page.locator('li', { hasText: /cartesian closed.+finite products/ })

	await expect(item).toBeVisible()

	await item.getByRole('link', { name: 'details' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category-implication/ccc_condition')
})

test('user can see the details of an implication', async ({ page }) => {
	await page.goto('/category-implication/ccc_condition')

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'cartesian closed',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'finite products',
			exact: true
		})
	).toBeVisible()

	await expect(page.locator('body')).toContainText('Proof: This holds by definition')
})

test('user can open the list of deduced implications', async ({ page }) => {
	await page.goto('/category-implications', { waitUntil: 'networkidle' })

	await expect(page.locator('li', { hasText: /abelian.+regular/ })).toBeVisible()

	await expect(page.locator('li', { hasText: /abelian.+coregular/ })).toHaveCount(0)

	await page
		.getByRole('button', {
			name: 'Show deduced implications',
			exact: true
		})
		.click()

	await expect(page.locator('li', { hasText: /abelian.+coregular/ })).toBeVisible()
})
