import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can open and close a proof for a property of a category', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Assigned properties')
		.getByRole('listitem')
		.filter({ hasText: 'is mono-regular' })

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

test('user can open a proof for a deduced satisfied property of a category and follow the link to the proof of an assumption', async ({
	page
}) => {
	await page.goto('/category/Ring', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'has an extremal generator' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Since it is one-sorted finitary algebraic (proof), it has an extremal generator'
	)

	await popup.getByRole('link', { name: 'proof', exact: true }).click()

	await expect(page).toHaveURL('/category/Ring?proof=one-sorted_finitary_algebraic')

	await expect(popup).toContainText(
		'Its parent category satisfies this property (proof).'
	)
})

test('user can open a proof for a deduced unsatisfied property of a category', async ({
	page
}) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is not cartesian closed' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Assume for contradiction that it is cartesian closed.'
	)
})

test('user can open a proof for an inherited satisfied property of a category', async ({
	page
}) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	const claim = get_property_list(
		page,
		'Satisfied properties',
		'Properties from parent'
	)
		.getByRole('listitem')
		.filter({ hasText: 'is abelian' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Its parent category satisfies this property (proof).'
	)
})

test('user can open a proof for an inherited unsatisfied property of a category', async ({
	page
}) => {
	await page.goto('/category/BG_f', { waitUntil: 'networkidle' })

	const claim = get_property_list(
		page,
		'Unsatisfied properties',
		'Properties from parent'
	)
		.getByRole('listitem')
		.filter({ hasText: 'is not thin' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Its parent category does not satisfy this property (proof).'
	)
})
