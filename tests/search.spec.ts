import { test, expect } from '@playwright/test'

test('user can navigate to the search page', async ({ page }) => {
	await page.goto('/')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Search',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Property combo search',
			exact: true,
		}),
	).toBeVisible()

	await expect(page).toHaveURL('/category-search')
})

test('user can enter properties', async ({ page }) => {
	await page.goto('/category-search')

	const satisfied_input_field = page.getByRole('textbox', {
		name: 'Satisfied property',
		exact: true,
	})

	for (const p of ['finitely complete', 'finitely cocomplete']) {
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
		exact: true,
	})

	for (const q of ['cocomplete', 'abelian']) {
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
			exact: true,
		})
		.click()

	await expect(page).toHaveURL(
		'/category-search/results?satisfied=finitely_complete%7Efinitely_cocomplete&unsatisfied=cocomplete%7Eabelian',
	)

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true,
		}),
	).toBeVisible()
})

test('user can view search results', async ({ page }) => {
	await page.goto(
		'/category-search/results?satisfied=finitely_complete%7Efinitely_cocomplete&unsatisfied=cocomplete%7Eabelian',
	)

	await expect(
		page.getByRole('heading', {
			name: 'Search results',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'finitely complete',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'finitely cocomplete',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'cocomplete',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'abelian',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of finite sets',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of countable groups',
			exact: true,
		}),
	).toBeVisible()
})

// TODO: test dualize search
