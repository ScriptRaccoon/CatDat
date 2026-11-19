import { test, expect } from '@playwright/test'

// this can be changed as soon as a property distinguishes abelianization from enveloping_group
test('user sees indistinguishable functors on the functor page', async ({ page }) => {
	await page.goto('/functor/abelianization')

	const list = page.getByRole('list', {
		name: 'Indistinguishable functors',
		exact: true
	})

	await list
		.getByRole('link', { name: 'enveloping group functor', exact: true })
		.click()

	await expect(page).toHaveURL('/functor/enveloping_group')
})

// this can be changed as soon as a property distinguishes abelianization from enveloping_group
test('user sees indistinguishable functor pairs on the page with missing data', async ({
	page
}) => {
	await page.goto('/missing', { waitUntil: 'networkidle' })

	const section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Indistinguishable functor pairs',
			exact: true
		})
	})

	const pair = section.getByRole('listitem').filter({
		has: page.getByRole('link', {
			name: 'abelianization functor for groups',
			exact: true
		})
	})

	await expect(
		pair.getByRole('link', { name: 'enveloping group functor', exact: true })
	).toBeVisible()
})
