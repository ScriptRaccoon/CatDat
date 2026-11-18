import { test, expect } from '@playwright/test'
import { encoded_delimiter } from '../utils'

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

	const satisfied_textbox = page.getByRole('combobox', {
		name: 'Satisfied property',
		exact: true
	})

	for (const p of ['preserves monomorphisms', 'preserves epimorphisms']) {
		await expect(satisfied_textbox).toHaveValue('')

		await satisfied_textbox.fill(p)
		await satisfied_textbox.focus()
		await page.waitForTimeout(500)
		await satisfied_textbox.press('Enter')

		await expect(page.getByRole('button', { name: p, exact: true })).toBeVisible()

		await expect(satisfied_textbox).toHaveValue('')
	}

	const unsatisfied_textbox = page.getByRole('combobox', {
		name: 'Unsatisfied property',
		exact: true
	})

	for (const q of ['left exact', 'right exact']) {
		await expect(unsatisfied_textbox).toHaveValue('')

		await unsatisfied_textbox.fill(q)
		await unsatisfied_textbox.focus()
		await page.waitForTimeout(500)
		await unsatisfied_textbox.press('Enter')

		await expect(page.getByRole('button', { name: q, exact: true })).toBeVisible()

		await expect(unsatisfied_textbox).toHaveValue('')
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
