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

	await expect(page.getByText('Grothendieck universes').first()).toBeVisible()
	await expect(page.getByText('collections').first()).toBeVisible()
	await expect(page.getByText('functor category').first()).toBeVisible()
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

	await expect(page.getByText('GitHub repository').first()).toBeVisible()
	await expect(page.getByText('suggestion form').first()).toBeVisible()
	await expect(page.getByText('pull request').first()).toBeVisible()
})

test('user can access the list of content pages', async ({ page }) => {
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
})

test('user can view proofs on a content page', async ({ page }) => {
	await page.goto('/content/cocongruences_of_groups')

	await expect(
		page.getByRole('heading', {
			name: 'Cocongruences on groups'
		})
	).toBeVisible()

	await expect(page.getByText('good pushouts of monomorphisms').first()).toBeVisible()

	await expect(
		page.getByText('Choose a system of representatives').first()
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of groups',
			exact: true
		})
	).toBeVisible()
})
