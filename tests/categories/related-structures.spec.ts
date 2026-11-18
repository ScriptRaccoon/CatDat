import { test, expect } from '@playwright/test'

test('user can navigate to a related category', async ({ page }) => {
	await page.goto('/category/FinSet', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Related") + span')
		.getByRole('link', {
			name: 'category of sets',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of sets',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Set')
})

test('user can navigate to the dual category if it exists in the database', async ({
	page
}) => {
	await page.goto('/category/Set')

	await expect(
		page.getByRole('heading', {
			name: 'category of sets',
			exact: true
		})
	).toBeVisible()

	await page
		.locator('strong:has-text("Dual") + span')
		.getByRole('link', {
			name: 'dual of the category of sets',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'dual of the category of sets',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Set_op')
})

test('user can navigate to a child category', async ({ page }) => {
	await page.goto('/category/BG', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Children") + span')
		.getByRole('link', {
			name: 'delooping of a non-trivial finite group',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'delooping of a non-trivial finite group',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/BG_f')
})

test('user can navigate to a parent category', async ({ page }) => {
	await page.goto('/category/Ring', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Parent") + span')
		.getByRole('link', {
			name: 'category of algebras',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of algebras',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Alg(R)')
})

test('user sees functors associated with the given category', async ({ page }) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('link', {
			name: 'abelianization functor for groups',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'torsion functor',
			exact: true
		})
	).toBeVisible()
})

test('user sees morphisms associated with the given category', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('link', {
			name: 'embedding of A3 into S3',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'identity map of a group',
			exact: true
		})
	).toBeVisible()
})

test('user sees symmetric monoidal categories for the given category', async ({
	page
}) => {
	await page.goto('/category/Top', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('link', {
			name: 'cartesian symmetric monoidal category of topological spaces',
			exact: true
		})
	).toBeVisible()
})
