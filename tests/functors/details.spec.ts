import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can view functor details', async ({ page }) => {
	await page.goto('/functor/pi_1')

	await expect(
		page.getByRole('heading', {
			name: 'fundamental group functor',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('group of homotopy classes of loops')
	await expect(page.getByRole('link', { name: 'nLab link' })).toBeVisible()
	await expect(
		get_property_list(page, 'Satisfied properties', 'Assigned properties')
	).toContainText('preserves products')
	await expect(
		get_property_list(page, 'Satisfied properties', 'Deduced properties')
	).toContainText('is essentially surjective')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Assigned properties')
	).toContainText('is not faithful')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Assigned properties')
	).toContainText('does not preserve binary coproducts')
})

test('user sees no unknown properties for a forgetful functor', async ({ page }) => {
	await page.goto('/functor/forget_vector')

	await expect(
		page.getByRole('list', { name: 'Unknown properties', exact: true })
	).toHaveCount(0)
})

test('user may see undecidable properties', async ({ page }) => {
	await page.goto('/functor/power_set_covariant')

	await expect(
		page.getByRole('heading', {
			name: 'covariant power set functor',
			exact: true
		})
	).toBeVisible()

	const link = page
		.getByRole('list', { name: 'Undecidable properties', exact: true })
		.getByRole('link', {
			name: 'essentially injective',
			exact: true
		})

	await expect(link).toBeVisible()
})
