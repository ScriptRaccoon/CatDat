import { test, expect, type Page } from '@playwright/test'

// https://playwright.dev/docs/api/class-keyboard#keyboard-press
const shortcut = 'ControlOrMeta+k'

function get_hint(page: Page) {
	return page.locator('kbd')
}

const search_pages = [
	{ path: '/category-list', label: 'search filter' },
	{ path: '/category-properties', label: 'search filter' },
	{ path: '/category-implications', label: 'search filter' },
	{ path: '/category/Set', label: 'look up a property' },
	{ path: '/category-property/complete', label: 'look up a category' },
	{ path: '/functor/abelianization', label: 'look up a property' }
]

for (const { path, label } of search_pages) {
	test(`user is informed about the shortcut on ${path}`, async ({ page }) => {
		await page.goto(path, { waitUntil: 'networkidle' })

		const input = page.getByRole('searchbox', { name: label })
		await expect(input).toHaveAttribute('aria-keyshortcuts', /^(Meta|Control)\+K$/)
		await expect(get_hint(page)).toBeVisible()
	})

	test(`user can focus the search field on ${path} with the shortcut`, async ({
		page
	}) => {
		await page.goto(path, { waitUntil: 'networkidle' })

		const input = page.getByRole('searchbox', { name: label })

		await page.keyboard.press(shortcut)

		await expect(input).toBeFocused()
		await expect(get_hint(page)).toBeHidden()
	})
}

const selection_pages = [
	{ path: '/category-comparison', label: 'category' },
	{ path: '/category-search', label: 'Satisfied property' }
]

for (const { path, label } of selection_pages) {
	test(`user is informed about the shortcut on ${path}`, async ({ page }) => {
		await page.goto(path, { waitUntil: 'networkidle' })

		const input = page.getByRole('combobox', { name: label, exact: true })
		await expect(input).toHaveAttribute('aria-keyshortcuts', /^(Meta|Control)\+K$/)
		await expect(get_hint(page)).toBeVisible()
	})

	test(`user can focus the selection on ${path} with the shortcut`, async ({
		page
	}) => {
		await page.goto(path, { waitUntil: 'networkidle' })

		const input = page.getByRole('combobox', { name: label, exact: true })

		await page.keyboard.press(shortcut)

		await expect(input).toBeFocused()
		await expect(get_hint(page)).toBeHidden()
		await expect(input).toHaveAttribute('aria-expanded', 'true')
	})
}

test('user can replace the search text after using the shortcut', async ({ page }) => {
	await page.goto('/category-list', { waitUntil: 'networkidle' })

	const input = page.getByRole('searchbox', { name: 'search filter' })
	await input.fill('groups')
	await input.blur()
	await expect(get_hint(page)).toBeHidden()

	await page.keyboard.press(shortcut)
	await page.keyboard.type('rings')

	await expect(input).toHaveValue('rings')
})

test('shortcut closes an expanded proof', async ({ page }) => {
	await page.goto('/category/Set?proof=Malcev&expanded=true', {
		waitUntil: 'networkidle'
	})

	const popup = page.locator('.popup')
	await expect(popup).toBeVisible()

	await page.keyboard.press(shortcut)

	await expect(popup).toBeHidden()
	await expect(page).toHaveURL('/category/Set')
	await expect(
		page.getByRole('searchbox', { name: 'look up a property' })
	).toBeFocused()
})
