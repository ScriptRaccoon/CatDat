import { test, expect } from '@playwright/test'

const encoded_delimiter = '%7E'

test('user can navigate to the search page', async ({ page }) => {
	await page.goto('/morphism-list')

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

	await expect(page).toHaveURL('/morphism-search')
})

test('user can enter properties', async ({ page }) => {
	await page.goto('/morphism-search')

	const satisfied_input_field = page.getByRole('textbox', {
		name: 'Satisfied property',
		exact: true
	})

	for (const p of ['monomorphism', 'epimorphism']) {
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

	for (const q of ['isomorphism']) {
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
		`/morphism-search/results?satisfied=monomorphism${encoded_delimiter}epimorphism&unsatisfied=isomorphism`
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
			name: 'embedding of integer into rational numbers',
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

	await expect(page.getByText('the requirements are inconsistent')).toBeVisible()

	await expect(page.getByText('isomorphism ⟹ split epimorphism')).toBeVisible()
})
