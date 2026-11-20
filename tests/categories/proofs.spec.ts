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

test('user can open a proof for a deduced satisfied property of a category and follow the proof links to an assigned proof', async ({
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

	await popup.getByRole('link', { name: 'proof', exact: true }).click()

	await expect(page).toHaveURL('/category/Alg(R)?proof=one-sorted_finitary_algebraic')

	await expect(popup).toContainText('Take the one-sorted algebraic theory of an')

	await expect(popup.getByRole('link', { name: 'proof', exact: true })).toHaveCount(0)
})

test('user can follow the proof links of a deduced property through several deduced proofs', async ({
	page
}) => {
	await page.goto('/category/CompHaus', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'has connected limits' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Since it is complete (proof), it has connected limits'
	)

	await popup.getByRole('link', { name: 'proof', exact: true }).click()

	await expect(page).toHaveURL('/category/CompHaus?proof=complete')

	await expect(popup).toContainText(
		'Since it has equalizers (proof) and has products (proof), it is complete'
	)

	await popup.getByRole('link', { name: 'proof', exact: true }).first().click()

	await expect(page).toHaveURL('/category/CompHaus?proof=equalizers')

	await expect(popup).toContainText('The equalizer in')

	await expect(popup.getByRole('link', { name: 'proof', exact: true })).toHaveCount(0)

	await popup.getByRole('button', { name: 'back to previous proof' }).click()

	await expect(page).toHaveURL('/category/CompHaus?proof=complete')

	await popup.getByRole('link', { name: 'proof', exact: true }).last().click()

	await expect(page).toHaveURL('/category/CompHaus?proof=products')

	await expect(popup).toContainText('By the Tychonoff product theorem')

	await expect(popup.getByRole('link', { name: 'proof', exact: true })).toHaveCount(0)
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
