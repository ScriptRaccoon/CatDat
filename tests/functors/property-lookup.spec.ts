import { test, expect } from '@playwright/test'

test('user can look up a property of a functor by its keyword', async ({ page }) => {
	await page.goto('/functor/forget_group', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })

	await lookup.fill('tripleable')

	await expect(results.getByRole('listitem')).toHaveText([
		'is monadic',
		'is not comonadic'
	])
})

test('user can look up a property of a functor by typing only a part of it', async ({
	page
}) => {
	await page.goto('/functor/forget_group', { waitUntil: 'networkidle' })

	const lookup = page.getByRole('searchbox', { name: 'look up a property' })
	const results = page.getByRole('list', { name: 'Property lookup results' })

	await lookup.fill('essentially surj') // cspell:disable-line

	await expect(results.getByRole('listitem')).toHaveText([
		'is not essentially surjective'
	])
})
