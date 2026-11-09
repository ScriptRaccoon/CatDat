import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('user can look up a property of a category', async ({ page }) => {
	await page.goto('/category/Set', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })

	await lookup.fill('cartesian closed')

	await expect(results.getByRole('listitem')).toHaveText([
		'is cartesian closed',
		'is locally cartesian closed'
	])

	await lookup.fill('Maltsev')

	await expect(results.getByRole('listitem')).toHaveText([
		'is not Malcev',
		'is co-Malcev'
	])

	await lookup.fill('xyz')

	await expect(page.getByText('No property matches')).toBeVisible()
	await expect(results).toHaveCount(0)
})

test('user can look up a property by typing only a part of it', async ({ page }) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })

	await lookup.fill('split ab')

	await expect(results.getByRole('listitem')).toHaveText(['is not split abelian'])
})

test('user can look up a property without its hyphens', async ({ page }) => {
	await page.goto('/category/Set', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })

	await lookup.fill('multi complete')

	await expect(results.getByRole('listitem')).toHaveText(['is multi-complete'])
})

test('user sees unknown and undecidable properties marked in the property lookup', async ({
	page
}) => {
	await page.goto('/category/BG', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })

	await lookup.fill('essentially countable')

	await expect(results.getByRole('listitem')).toHaveText([
		'is essentially countable (undecidable)'
	])

	// remove or update this when the property is decided
	await page.goto('/category/Met_c', { waitUntil: 'networkidle' })

	await lookup.fill('accessible')

	await expect(results.getByRole('listitem').first()).toHaveText(
		'is accessible (unknown)'
	)
})

test('user sees properties matching by keyword after the other properties in the property lookup', async ({
	page
}) => {
	await page.goto('/category/Set', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })

	await lookup.fill('coproducts')

	await expect(results.getByRole('listitem')).toHaveText([
		'has coproducts',
		'has coproduct-stable monomorphisms',
		'has binary coproducts',
		'has countable coproducts',
		'has disjoint coproducts',
		'has disjoint finite coproducts',
		'has finite coproducts',
		'has finite-coproduct-stable monomorphisms',
		'has ℵ₂-small coproducts',
		'does not satisfy CIP',
		'does not satisfy CSP',
		'has pushouts'
	])
})

test('user can open a proof from the property lookup', async ({ page }) => {
	await page.goto('/category/Set', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })
	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await lookup.fill('Malcev')
	await results
		.getByRole('listitem')
		.filter({ hasText: 'is not Malcev' })
		.getByRole('button', { name: 'Show proof' })
		.click()

	await expect(page).toHaveURL('/category/Set?proof=Malcev')
	await expect(popup).toBeVisible()

	await popup.getByRole('button', { name: 'close' }).click()
	await page.getByRole('button', { name: 'clear search' }).click()

	await expect(lookup).toHaveValue('')
	await expect(results).toHaveCount(0)

	// the proof in the regular list is still registered
	await get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is not Malcev' })
		.locator('button')
		.click()

	await expect(page).toHaveURL('/category/Set?proof=Malcev')
	await expect(popup).toBeVisible()
})
