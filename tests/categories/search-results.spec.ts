import { test, expect } from '@playwright/test'
import { encoded_delimiter } from '../utils'

test('user can view search results', async ({ page }) => {
	await page.goto(
		`/category-search/results?satisfied=finitely_complete${encoded_delimiter}finitely_cocomplete&unsatisfied=cocomplete${encoded_delimiter}abelian`
	)

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'finitely complete',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'finitely cocomplete',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'cocomplete',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'abelian',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of finite sets',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of countable groups',
			exact: true
		})
	).toBeVisible()
})

test('user can dualize search', async ({ page }) => {
	const url = '/category-search/results?satisfied=Barr-exact&unsatisfied=complete'
	const dual_url =
		'/category-search/results?satisfied=Barr-coexact&unsatisfied=cocomplete'

	await page.goto(url, { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'Barr-exact',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of finite groups',
			exact: true
		})
	).toBeVisible()

	const dualize_link = page.getByRole('link', {
		name: 'Dualize search',
		exact: true
	})

	await expect(dualize_link).toBeVisible()
	expect(await dualize_link.getAttribute('href')).toContain(dual_url)

	await dualize_link.click()

	await expect(
		page.getByRole('link', {
			name: 'Barr-coexact',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of finite groups',
			exact: true
		})
	).toHaveCount(0)

	await expect(
		page.getByRole('link', {
			name: 'partially ordered set of natural numbers',
			exact: true
		})
	).toBeVisible()
})

test('contradictions are detected', async ({ page }) => {
	await page.goto(
		'/category-search/results?satisfied=equalizers~products&unsatisfied=pullbacks'
	)

	const body = page.locator('body')
	await expect(body).toContainText('the requirements are inconsistent')

	await expect(page.locator('a[href^="/category/"]')).toHaveCount(0)

	const steps = page
		.getByRole('list', { name: 'Inconsistency proof' })
		.getByRole('listitem')

	const step = steps.filter({
		hasText: /^\s*equalizers\s+∧\s+products\s+⟹\s+complete\s*$/
	})

	await expect(step).toBeVisible()

	await expect(step.getByRole('link', { name: 'details' })).toHaveAttribute(
		'href',
		'/category-implication/complete_characterization'
	)
})

test('user is told that a property cannot be both satisfied and unsatisfied', async ({
	page
}) => {
	await page.goto('/category-search/results?satisfied=pullbacks&unsatisfied=pullbacks')

	await expect(page.locator('body')).toContainText(
		'No categories found because the property pullbacks cannot be both satisfied and unsatisfied.'
	)

	await expect(page.getByRole('list', { name: 'Inconsistency proof' })).toHaveCount(0)

	await expect(page.locator('a[href^="/category/"]')).toHaveCount(0)
})
