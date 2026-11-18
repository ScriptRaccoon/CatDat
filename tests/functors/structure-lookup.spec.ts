import { test, expect } from '@playwright/test'

test('user can look up a functor on a property page', async ({ page }) => {
	await page.goto('/functor-property/monadic', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a functor' })
	const results = page.getByRole('list', { name: 'Functor lookup results' })

	await lookup.fill('functor for groups')

	await expect(results.getByRole('listitem')).toHaveText([
		'abelianization functor for groups (unsatisfied)',
		'forgetful functor for groups (satisfied)'
	])
})

test('user can look up a functor by its keyword on a property page', async ({ page }) => {
	await page.goto('/functor-property/monadic', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a functor' })
	const results = page.getByRole('list', { name: 'Functor lookup results' })

	await lookup.fill('underlying set functor')

	await expect(results.getByRole('listitem')).toHaveText([
		'forgetful functor for groups (satisfied)',
		'forgetful functor for rings (satisfied)',
		'forgetful functor for topological spaces (unsatisfied)',
		'forgetful functor for vector spaces (satisfied)'
	])
})
