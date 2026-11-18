import { test, expect } from '@playwright/test'

test('user can navigate to a related functor', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Related") + span')
		.getByRole('link', {
			name: 'forgetful functor for groups',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'forgetful functor for groups',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/forget_group')
})

test('user can navigate to the domain category', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Domain") + span')
		.getByRole('link', {
			name: 'category of rings',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of rings',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Ring')
})

test('user can navigate to the codomain category', async ({ page }) => {
	await page.goto('/functor/group_units', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Codomain") + span')
		.getByRole('link', {
			name: 'category of groups',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of groups',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Grp')
})

test('user can navigate to the left adjoint functor', async ({ page }) => {
	await page.goto('/functor/group_units', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Left adjoint") + span')
		.getByRole('link', {
			name: 'forgetful functor from groups to monoids',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'forgetful functor from groups to monoids',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/forget_inverses')
})

test('user can navigate to the right adjoint functor', async ({ page }) => {
	await page.goto('/functor/forget_topology', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Right adjoint") + span')
		.getByRole('link', {
			name: 'indiscrete topology functor',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'indiscrete topology functor',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/indiscrete_topology')
})
