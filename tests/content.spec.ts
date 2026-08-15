import { test, expect } from '@playwright/test'

test('user can navigate to the foundations page', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'Foundations',
			exact: true
		})
		.click()

	await expect(page).toHaveURL('/content/foundations')

	await expect(
		page.getByRole('heading', {
			name: 'Foundations',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('Grothendieck universes')
	await expect(body).toContainText('collections')
	await expect(body).toContainText('functor category')
})

test('user can navigate to the contributions page', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'Contribute',
			exact: true
		})
		.click()

	await expect(page).toHaveURL('/content/contribute')

	await expect(
		page.getByRole('heading', {
			name: 'How to contribute',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('GitHub repository')
	await expect(body).toContainText('suggestion form')
	await expect(body).toContainText('pull request')
})

test('user can access a content page from the list page', async ({ page }) => {
	await page.goto('/content')

	await expect(
		page.getByRole('heading', {
			name: 'Content pages',
			exact: true
		})
	).toBeVisible()

	await page.getByRole('link', { name: 'Cocongruences on groups' }).click()

	await expect(page).toHaveURL('/content/cocongruences_of_groups')

	await expect(
		page.getByRole('heading', {
			name: 'Cocongruences on groups'
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('good pushouts of monomorphisms')
	await expect(body).toContainText('Choose a system of representatives')
})

test('user can view referencing categories on a content page', async ({ page }) => {
	await page.goto('/content/cocongruences_of_groups')

	await expect(page.locator('body')).toContainText(
		'This page is referenced by the following categories.'
	)

	const context = page
		.getByRole('heading', {
			name: 'Context',
			exact: true
		})
		.locator('xpath=following-sibling::ul')

	await expect(
		context.getByRole('link', {
			name: 'category of groups',
			exact: true
		})
	).toBeVisible()
})
