import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can open and close a proof for a property of a functor', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Assigned properties')
		.getByRole('listitem')
		.filter({ hasText: 'is monadic' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup')

	await expect(popup).toBeVisible()
	await expect(popup).toHaveAccessibleName(/is monadic/)
	await expect(popup).toContainText('For every algebraic category')

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(popup).toBeHidden()
})

test('user can open a proof for a deduced satisfied property of a functor and follow the link to the proof of an assumption', async ({
	page
}) => {
	await page.goto('/functor/free_group', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is cocontinuous' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup')

	await expect(popup).toContainText(
		'Since it is a left adjoint (proof), it is cocontinuous'
	)

	await popup.getByRole('link', { name: 'proof', exact: true }).click()

	await expect(page).toHaveURL('/functor/free_group?proof=left_adjoint')

	await expect(popup).toContainText(
		'By definition, this functor is left adjoint to the forgetful functor'
	)
})

test('user can open a proof for a deduced unsatisfied property of a functor', async ({
	page
}) => {
	await page.goto('/functor/pi_1', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is not continuous' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup')

	await expect(popup).toContainText('Assume for contradiction that it is continuous.')
})
