import { test, expect } from '@playwright/test'

test('user can navigate to compare page', async ({ page }) => {
	await page.goto('/')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Compare',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Compare categories',
			exact: true,
		}),
	).toBeVisible()

	await expect(page).toHaveURL('/category-comparison')
})

test('user can select categories for comparison', async ({ page }) => {
	await page.goto('/category-comparison')

	await expect(
		page.getByRole('heading', {
			name: 'Compare categories',
			exact: true,
		}),
	).toBeVisible()

	const textbox = page.getByRole('textbox', { name: 'Category' })

	for (const category of ['category of rings', 'category of commutative rings']) {
		await expect(textbox).toHaveValue('')
		await textbox.fill(category)
		await textbox.focus()
		await page.waitForTimeout(500)
		await textbox.press('Enter')

		await expect(textbox).toHaveValue('')

		await expect(
			page.getByRole('button', {
				name: category,
				exact: true,
			}),
		).toBeVisible()
	}

	await page
		.getByRole('button', {
			name: 'Compare',
			exact: true,
		})
		.click()

	await expect(page).toHaveURL('/category-comparison/Ring/CRing')

	await expect(
		page.getByRole('heading', {
			name: 'Comparison of categories',
			exact: true,
		}),
	).toBeVisible()
})

test('user can view comparison table', async ({ page }) => {
	await page.goto('/category-comparison/Ring/CRing')

	await expect(
		page.getByRole('heading', {
			name: 'Comparison of categories',
			exact: true,
		}),
	).toBeVisible()

	await expect(page.getByText('category of rings')).toBeVisible()
	await expect(page.getByText('category of commutative rings')).toBeVisible()

	const table = page.getByRole('table')
	await expect(table).toBeVisible()

	const table_except = {
		abelian: ['no', 'no'],
		generator: ['yes', 'yes'],
		cocomplete: ['yes', 'yes'],
		coextensive: ['no', 'yes'],
	}

	for (const [prop, values] of Object.entries(table_except)) {
		const row = table
			.locator('tbody tr', {
				has: page.getByRole('link', { name: prop, exact: true }),
			})
			.first()
		await expect(row).toBeVisible()
		await expect(row.locator('td').nth(1)).toHaveAttribute('aria-label', values[0])
		await expect(row.locator('td').nth(2)).toHaveAttribute('aria-label', values[1])
	}
})
