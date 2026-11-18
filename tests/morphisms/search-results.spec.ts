import { test, expect } from '@playwright/test'
import { encoded_delimiter } from '../utils'

test('user can view search results', async ({ page }) => {
	await page.goto(
		`/morphism-search/results?satisfied=monomorphism${encoded_delimiter}epimorphism&unsatisfied=isomorphism`
	)

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'monomorphism',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'isomorphism',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'embedding of integers into rational numbers',
			exact: true
		})
	).toBeVisible()
})

test('user can dualize search', async ({ page }) => {
	const url =
		'/morphism-search/results?satisfied=regular_epimorphism&unsatisfied=monomorphism'
	const dual_url =
		'/morphism-search/results?satisfied=regular_monomorphism&unsatisfied=epimorphism'

	await page.goto(url, { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'regular epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'reduction modulo p',
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
			name: 'regular monomorphism',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'map from the empty set',
			exact: true
		})
	).toBeVisible()
})

test('contradictions are detected', async ({ page }) => {
	await page.goto(
		'/morphism-search/results?satisfied=regular_epimorphism~monomorphism&unsatisfied=split_epimorphism'
	)

	const body = page.locator('body')

	await expect(body).toContainText('the requirements are inconsistent')

	await expect(
		page.getByRole('link', { name: 'isomorphism ⟹ split epimorphism' })
	).toHaveAttribute('href', '/morphism-implication/dual_iso_is_mono')
})
