import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can view symmetric monoidal category details', async ({ page }) => {
	await page.goto('/symmetric_monoidal_category/Ab_tensor')

	await expect(
		page.getByRole('heading', {
			name: 'symmetric monoidal category of abelian groups',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('tensor product of abelian groups')
	await expect(
		get_property_list(page, 'Satisfied properties', 'Properties from parent')
	).toContainText('is closed')
	await expect(
		get_property_list(page, 'Satisfied properties', 'Deduced properties')
	).toContainText('is cocomplete')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Properties from parent')
	).toContainText('is not strict')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
	).toContainText('is not cartesian')
})
