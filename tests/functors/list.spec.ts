import { test, expect } from '@playwright/test'

test('user can navigate to a functor', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'functors',
			exact: true
		})
		.first()
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'List of functors',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-list')

	await page
		.getByRole('link', {
			name: 'fundamental group functor',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'fundamental group functor',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/pi_1')
})

test('user can search for a functor by its name', async ({ page }) => {
	await page.goto('/functor-list', { waitUntil: 'networkidle' })

	const irrelevant_names = [
		'abelianization functor for groups',
		'fundamental group functor'
	]

	for (const name of irrelevant_names) {
		await expect(page.getByRole('link', { name, exact: true })).toBeVisible()
	}

	await page.getByRole('searchbox', { name: 'search filter' }).fill('power set')

	await expect(
		page.getByRole('link', {
			name: 'covariant power set functor',
			exact: true
		})
	).toBeVisible()

	for (const name of irrelevant_names) {
		await expect(page.getByRole('link', { name, exact: true })).not.toBeVisible()
	}
})

test('user can search for a functor by its keyword', async ({ page }) => {
	await page.goto('/functor-list', { waitUntil: 'networkidle' })

	await page.getByRole('searchbox', { name: 'search filter' }).fill('group completion')

	await expect(
		page.getByRole('link', {
			name: 'enveloping group functor',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'abelianization functor for groups',
			exact: true
		})
	).not.toBeVisible()
})

test("user can navigate to functors tagged with 'topology' from the functor list page", async ({
	page
}) => {
	await page.goto('/functor-list', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'topology',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Functors tagged with 'topology'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'path components functor',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to functors tagged with 'algebra' from the functor detail page", async ({
	page
}) => {
	await page.goto('/functor/abelianization', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'algebra',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Functors tagged with 'algebra'",
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
