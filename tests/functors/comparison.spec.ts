import { test, expect } from '@playwright/test'

test('user can view comparison table', async ({ page }) => {
	await page.goto('/functor-comparison/forget_group/forget_topology')

	await expect(
		page.getByRole('heading', {
			name: 'Comparison of functors',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')
	await expect(body).toContainText('forgetful functor for groups')
	await expect(body).toContainText('forgetful functor for topological spaces')

	const table = page.getByRole('table')
	await expect(table).toBeVisible()

	const table_excerpt = [
		['faithful', 'yes', 'yes'],
		['monadic', 'yes', 'no'],
		['left adjoint', 'no', 'yes'],
		['conservative', 'yes', 'no']
	]

	for (const [prop, value_1, value_2] of table_excerpt) {
		const row = table.locator('tbody tr', {
			has: page.getByRole('link', { name: prop, exact: true })
		})
		await expect(row).toBeVisible()
		await expect(row.locator('td').nth(1)).toHaveAttribute('aria-label', value_1)
		await expect(row.locator('td').nth(2)).toHaveAttribute('aria-label', value_2)
	}
})
