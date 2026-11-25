import { test, expect } from '@playwright/test'
import { encoded_delimiter } from '../utils'

test('user can view search results', async ({ page }) => {
	await page.goto(
		`/functor-search/results?satisfied=preserves_monomorphisms${encoded_delimiter}preserves_epimorphisms&unsatisfied=left_exact${encoded_delimiter}right_exact`
	)

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'preserves monomorphisms',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'preserves epimorphisms',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'left exact',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'right exact',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'covariant power set functor',
			exact: true
		})
	).toBeVisible()
})

test('user can dualize search', async ({ page }) => {
	const url = '/functor-search/results?satisfied=continuous&unsatisfied=monadic'
	const dual_url =
		'/functor-search/results?satisfied=cocontinuous&unsatisfied=comonadic'

	await page.goto(url, { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'continuous',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'p-torsion functor',
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
			name: 'cocontinuous',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'modulo p functor',
			exact: true
		})
	).toBeVisible()
})

test('contradictions are detected', async ({ page }) => {
	await page.goto(
		'/functor-search/results?satisfied=cocontinuous~continuous&unsatisfied=preserves_terminal_objects'
	)

	const body = page.locator('body')

	await expect(body).toContainText('the requirements are inconsistent')

	await expect(page.locator('a[href^="/functor/"]')).toHaveCount(0)

	const steps = page
		.getByRole('list', { name: 'Inconsistency proof' })
		.getByRole('listitem')

	const step = steps.filter({
		hasText: /^\s*continuous\s+⟹\s+preserves products\s*$/
	})

	await expect(step).toBeVisible()

	await expect(step.getByRole('link', { name: 'details' })).toHaveAttribute(
		'href',
		'/functor-implication/continuous_consequences'
	)
})
