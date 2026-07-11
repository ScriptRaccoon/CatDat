import { test, expect } from '@playwright/test'

const encoded_delimiter = '%7E'

test('user can navigate to the search page', async ({ page }) => {
	await page.goto('/functor-list')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Search',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Property combo search',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-search')
})

test('user can enter properties', async ({ page }) => {
	await page.goto('/functor-search')

	const satisfied_input_field = page.getByRole('textbox', {
		name: 'Satisfied property',
		exact: true
	})

	for (const p of ['preserves monomorphisms', 'preserves epimorphisms']) {
		await expect(satisfied_input_field).toHaveValue('')

		await satisfied_input_field.fill(p)
		await satisfied_input_field.focus()
		await page.waitForTimeout(500)
		await satisfied_input_field.press('Enter')

		await expect(page.getByRole('button', { name: p, exact: true })).toBeVisible()

		await expect(satisfied_input_field).toHaveValue('')
	}

	const unsatisfied_input_field = page.getByRole('textbox', {
		name: 'Unsatisfied property',
		exact: true
	})

	for (const q of ['left exact', 'right exact']) {
		await expect(unsatisfied_input_field).toHaveValue('')

		await unsatisfied_input_field.fill(q)
		await unsatisfied_input_field.focus()
		await page.waitForTimeout(500)
		await unsatisfied_input_field.press('Enter')

		await expect(page.getByRole('button', { name: q, exact: true })).toBeVisible()

		await expect(unsatisfied_input_field).toHaveValue('')
	}

	await page
		.getByRole('button', {
			name: 'Search',
			exact: true
		})
		.click()

	await expect(page).toHaveURL(
		`/functor-search/results?satisfied=preserves_monomorphisms${encoded_delimiter}preserves_epimorphisms&unsatisfied=left_exact${encoded_delimiter}right_exact`
	)

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true
		})
	).toBeVisible()
})

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
