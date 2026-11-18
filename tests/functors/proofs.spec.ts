import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can open and close a proof for a property of a functor', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Assigned properties')
		.getByRole('listitem')
		.filter({ hasText: 'is monadic' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).toBeVisible()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	const text = (await popup.textContent())?.trim() ?? ''

	const proof_text = text.replace(/^Proof/, '').trim()

	expect(proof_text.length).toBeGreaterThan(0)

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).not.toBeVisible()
})

test('user can open a proof for a deduced satisfied property of functor', async ({
	page
}) => {
	await page.goto('/functor/free_group', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is cocontinuous' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText('Since it is a left adjoint, it is cocontinuous')
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

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText('Assume for contradiction that it is continuous.')
})
