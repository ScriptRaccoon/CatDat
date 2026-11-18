import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can open and close a proof for a property of a morphism', async ({ page }) => {
	await page.goto('/morphism/A3-S3-embedding', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Assigned properties')
		.getByRole('listitem')
		.filter({ hasText: 'is a normal monomorphism' })

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

	expect(proof_text).toContain('normal subgroup')

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).not.toBeVisible()
})

test('user can open a proof for a deduced satisfied property of a morphism', async ({
	page
}) => {
	await page.goto('/morphism/terminal-map', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is a strict epimorphism' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Since it is a regular epimorphism, it is a strict epimorphism'
	)
})

test('user can open a proof for a deduced unsatisfied property of a morphism', async ({
	page
}) => {
	await page.goto('/morphism/multiply-2', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is not a regular monomorphism' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Assume for contradiction that it is a regular monomorphism.'
	)
})
