import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

test('opening and closing a proof updates the URL', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Assigned properties')
		.getByRole('listitem')
		.filter({ hasText: 'is mono-regular' })

	await claim.locator('button').click()

	await expect(page).toHaveURL('/category/Grp?proof=mono-regular')

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(page).toHaveURL('/category/Grp')
})

test('user can open a proof via the URL', async ({ page }) => {
	await page.goto('/category/Grp?proof=mono-regular', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toBeVisible()
	await expect(popup).toContainText('nLab')
})

test('user can open a deduced proof via the URL', async ({ page }) => {
	await page.goto('/category/Set?proof=balanced', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toBeVisible()
	await expect(popup).toContainText('it is balanced')
})

test('user can open a proof of special morphisms via the URL', async ({ page }) => {
	await page.goto('/category/Grp?proof=epimorphism', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toBeVisible()
})

test('user can follow a link to a proof on another page', async ({ page }) => {
	// both pages have a proof with the same key, which must not interfere
	await page.goto('/category/Alg(R)?proof=Malcev', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })
	await expect(popup).toContainText('in the same way')

	await popup.locator('a[href="/category/Grp?proof=Malcev"]').click()

	await expect(page).toHaveURL('/category/Grp?proof=Malcev')
	await expect(popup).toBeVisible()
	await expect(popup).not.toContainText('in the same way')
})

test('user can follow a link to a proof on the same page', async ({ page }) => {
	await page.goto('/category/Grp_fg?proof=aleph1-cofiltered_limits', {
		waitUntil: 'networkidle'
	})

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })
	await expect(popup).toContainText('cofiltered')

	await popup.locator('a[href="/category/Grp_fg?proof=kernels"]').click()

	await expect(page).toHaveURL('/category/Grp_fg?proof=kernels')
	await expect(popup).toBeVisible()
	await expect(popup).not.toContainText('cofiltered')
})

for (const via of ['back button', 'browser']) {
	test(`user can go back to the previous proof via the ${via}`, async ({ page }) => {
		await page.goto('/category/GrpAct', { waitUntil: 'networkidle' })

		await get_property_list(page, 'Satisfied properties', 'Assigned properties')
			.getByRole('listitem')
			.filter({ hasText: 'has effective cocongruences' })
			.locator('button')
			.click()

		const popup = page.locator('.popup').filter({ hasText: 'Proof' })
		const back_button = popup.getByRole('button', { name: 'back to previous proof' })

		await expect(back_button).toHaveCount(0)

		const link = popup.locator('a[href="/category/GrpAct?proof=mono-regular"]').last()
		await link.scrollIntoViewIfNeeded()
		const scroll_top = await popup.evaluate((el) => el.scrollTop)
		expect(scroll_top).toBeGreaterThan(0)

		await link.click()

		await expect(page).toHaveURL('/category/GrpAct?proof=mono-regular')
		await expect(back_button).toBeVisible()

		if (via === 'browser') {
			await page.goBack()
		} else {
			await back_button.click()
		}

		await expect(page).toHaveURL('/category/GrpAct?proof=effective_cocongruences')
		await expect(back_button).toHaveCount(0)
		await expect(popup).toContainText('good pushouts of monomorphisms')
		await expect.poll(() => popup.evaluate((el) => el.scrollTop)).toBe(scroll_top)
	})
}
