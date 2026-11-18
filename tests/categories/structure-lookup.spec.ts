import { test, expect } from '@playwright/test'

test('user can look up a category on a property page', async ({ page }) => {
	await page.goto('/category-property/cartesian_closed', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a category' })
	const results = page.getByRole('list', { name: 'Category lookup results' })

	await lookup.fill('simplicial sets')

	await expect(results.getByRole('listitem')).toHaveText([
		'category of simplicial sets (satisfied)'
	])

	await lookup.fill('graded abelian')

	await expect(results.getByRole('listitem')).toHaveText([
		'category of graded abelian groups (unsatisfied)'
	])

	await lookup.fill('xyz')

	await expect(page.getByText('No category matches')).toBeVisible()
	await expect(results).toHaveCount(0)
})

test('user can look up a category by its keyword on a property page', async ({
	page
}) => {
	await page.goto('/category-property/cartesian_closed', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a category' })
	const results = page.getByRole('list', { name: 'Category lookup results' })

	await lookup.fill('simple graphs')

	await expect(results.getByRole('listitem')).toHaveText([
		'category of sets equipped with a symmetric irreflexive binary relation (unsatisfied)'
	])
})

test('user can look up a category without its hyphens on a property page', async ({
	page
}) => {
	await page.goto('/category-property/cartesian_closed', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a category' })
	const results = page.getByRole('list', { name: 'Category lookup results' })

	await lookup.fill('nonempty sets')

	await expect(results.getByRole('listitem')).toHaveText([
		'category of non-empty sets (satisfied)'
	])
})

test('user sees unknown and undecidable categories marked in the category lookup', async ({
	page
}) => {
	await page.goto('/category-property/essentially_countable', {
		waitUntil: 'networkidle'
	})

	const lookup = page.getByRole('searchbox', { name: 'look up a category' })
	const results = page.getByRole('list', { name: 'Category lookup results' })

	await lookup.fill('delooping of a group')

	await expect(results.getByRole('listitem')).toHaveText([
		'delooping of a group (undecidable)'
	])

	// remove or update this when the property is decided
	await page.goto('/category-property/accessible', { waitUntil: 'networkidle' })

	await lookup.fill('metric spaces with continuous maps')

	await expect(results.getByRole('listitem')).toHaveText([
		'category of metric spaces with continuous maps (unknown)'
	])
})
