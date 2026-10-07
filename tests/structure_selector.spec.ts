import { test, expect, type Page } from '@playwright/test'

function get_selector(page: Page) {
	return page.getByRole('combobox', { name: 'Structure', exact: true })
}

async function select_type(page: Page, label: string) {
	const selector = get_selector(page)
	await selector.click()
	await expect(selector).toHaveAttribute('aria-expanded', 'true')
	await page.getByRole('option', { name: label, exact: true }).click()
}

test('categories are selected by default', async ({ page }) => {
	await page.goto('/')

	const selector = get_selector(page)

	await expect(selector).toBeVisible()
	await expect(selector).toHaveText('categories')
	await expect(selector).not.toHaveText('functors')
})

test('user can switch to functors', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	await select_type(page, 'functors')

	await expect(get_selector(page)).toHaveText('functors')
	await expect(get_selector(page)).not.toHaveText('categories')

	await expect(page).toHaveURL('/functor-list')

	await expect(
		page.getByRole('heading', {
			name: 'List of functors',
			exact: true
		})
	).toBeVisible()
})

test('functors are selected on a functor route', async ({ page }) => {
	await page.goto('/functor-properties')

	await expect(get_selector(page)).toHaveText('functors')
})

test('user can switch to morphisms', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	await select_type(page, 'morphisms')

	await expect(get_selector(page)).toHaveText('morphisms')
	await expect(get_selector(page)).not.toHaveText('categories')

	await expect(page).toHaveURL('/morphism-list')

	await expect(
		page.getByRole('heading', {
			name: 'List of morphisms',
			exact: true
		})
	).toBeVisible()
})

test('morphisms are selected on a morphism route', async ({ page }) => {
	await page.goto('/morphism-properties')

	await expect(get_selector(page)).toHaveText('morphisms')
})

test('user can switch to symmetric monoidal categories', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	await select_type(page, 'symmetric monoidal categories')

	await expect(get_selector(page)).toHaveText('symmetric monoidal categories')
	await expect(get_selector(page)).not.toHaveText('categories')

	await expect(page).toHaveURL('/symmetric_monoidal_category-list')

	await expect(
		page.getByRole('heading', {
			name: 'List of symmetric monoidal categories',
			exact: true
		})
	).toBeVisible()
})

test('symmetric monoidal categories are selected on a symmetric monoidal category route', async ({
	page
}) => {
	await page.goto('/symmetric_monoidal_category-properties')

	await expect(get_selector(page)).toHaveText('symmetric monoidal categories')
})

test('user can switch structures with the keyboard', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	const selector = get_selector(page)
	await expect(selector).toHaveAttribute('aria-expanded', 'false')
	await selector.focus()
	await selector.press('Enter')
	await expect(selector).toHaveAttribute('aria-expanded', 'true')
	await selector.press('ArrowDown')
	await selector.press('Enter')
	await expect(selector).toHaveAttribute('aria-expanded', 'false')

	await expect(selector).toHaveText('functors')
	await expect(page).toHaveURL('/functor-list')
})
