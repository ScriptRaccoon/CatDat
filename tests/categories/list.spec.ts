import { test, expect } from '@playwright/test'

test('user can navigate to a category', async ({ page }) => {
	await page.goto('/')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Categories',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'List of categories',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category-list')

	await page
		.getByRole('link', {
			name: 'category of commutative rings',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of commutative rings',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/CRing')
})

test('user can search for a category by its name', async ({ page }) => {
	await page.goto('/category-list', { waitUntil: 'networkidle' })

	const irrelevant_names = [
		'category of rings',
		'category of groups',
		'category of sets'
	]

	for (const name of irrelevant_names) {
		await expect(page.getByRole('link', { name, exact: true })).toBeVisible()
	}

	await page.getByRole('searchbox', { name: 'search filter' }).fill('commutative ring')

	await expect(
		page.getByRole('link', {
			name: 'category of commutative rings',
			exact: true
		})
	).toBeVisible()

	for (const name of irrelevant_names) {
		await expect(page.getByRole('link', { name, exact: true })).not.toBeVisible()
	}
})

test('user can search for a category without its hyphens', async ({ page }) => {
	await page.goto('/category-list', { waitUntil: 'networkidle' })

	// cspell:disable-next-line
	await page.getByRole('searchbox', { name: 'search filter' }).fill('pseudometric')

	await expect(
		page.getByRole('link', {
			name: 'category of pseudo-metric spaces with non-expansive maps',
			exact: true
		})
	).toBeVisible()

	await page
		.getByRole('searchbox', { name: 'search filter' })
		.fill('finite dimensional vector spaces')

	await expect(
		page.getByRole('link', {
			name: 'category of finite-dimensional vector spaces',
			exact: true
		})
	).toBeVisible()
})

test('user can search for a category by its keyword', async ({ page }) => {
	await page.goto('/category-list', { waitUntil: 'networkidle' })

	await page.getByRole('searchbox', { name: 'search filter' }).fill('directed graph')

	await expect(
		page.getByRole('link', {
			name: 'category of sets equipped with a binary relation',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of sets',
			exact: true
		})
	).not.toBeVisible()
})

test("user can navigate to categories tagged with 'analysis' from the category list page", async ({
	page
}) => {
	await page.goto('/category-list', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'analysis',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Categories tagged with 'analysis'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of measurable spaces',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to categories tagged with 'algebra' from the category detail page", async ({
	page
}) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'algebra',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Categories tagged with 'algebra'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of finite groups',
			exact: true
		})
	).toBeVisible()
})
