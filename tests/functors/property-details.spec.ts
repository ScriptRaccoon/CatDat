import { test, expect } from '@playwright/test'

test('user can view functor property details', async ({ page }) => {
	await page.goto('/functor-property/faithful')

	await expect(
		page.getByRole('heading', {
			name: 'faithful',
			exact: true
		})
	).toBeVisible()

	await expect(page.locator('body')).toContainText('is faithful when')

	const related_link = page
		.locator('strong:has-text("Related") + span')
		.getByRole('link', {
			name: 'fully faithful',
			exact: true
		})

	expect(related_link).toBeVisible()

	const examples = page
		.getByRole('heading', {
			name: 'Examples',
			exact: true
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		examples.getByRole('link', {
			name: 'forgetful functor for rings',
			exact: true
		})
	).toBeVisible()

	await expect(
		examples.getByRole('link', {
			name: 'free group functor',
			exact: true
		})
	).toBeVisible()

	const counterexamples = page
		.getByRole('heading', {
			name: 'Counterexamples',
			exact: true
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		counterexamples.getByRole('link', {
			name: 'abelianization functor for groups',
			exact: true
		})
	).toBeVisible()

	await expect(
		counterexamples.getByRole('link', {
			name: 'fundamental group functor',
			exact: true
		})
	).toBeVisible()
})

test('user can navigate to the dual property', async ({ page }) => {
	await page.goto('/functor-property/left_exact')

	await expect(
		page.getByRole('heading', {
			name: 'left exact',
			exact: true
		})
	).toBeVisible()

	await page
		.locator('strong:has-text("Dual") + span')
		.getByRole('link', {
			name: 'right exact',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'right exact',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-property/right_exact')
})
