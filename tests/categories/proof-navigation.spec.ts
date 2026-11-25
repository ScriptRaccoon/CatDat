import { test, expect, type Locator } from '@playwright/test'
import { get_property_list } from '../utils'

function is_full_height(popup: Locator) {
	return popup.evaluate((el) => el.getBoundingClientRect().height >= window.innerHeight)
}

test('opening and closing a proof updates the URL', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Satisfied properties', 'Assigned properties')
		.getByRole('listitem')
		.filter({ hasText: 'is mono-regular' })

	await claim.locator('button').click()

	await expect(page).toHaveURL('/category/Grp?proof=mono-regular')

	const popup = page.locator('.popup')

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(page).toHaveURL('/category/Grp')
})

test('user can open a proof via the URL', async ({ page }) => {
	await page.goto('/category/Grp?proof=mono-regular', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup')

	await expect(popup).toBeVisible()
	await expect(popup).toHaveAccessibleName(/is mono-regular/)
	await expect(popup).toContainText('nLab')
})

test('user can open a deduced proof via the URL', async ({ page }) => {
	await page.goto('/category/Set?proof=balanced', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup')

	await expect(popup).toBeVisible()
	await expect(popup).toContainText('it is balanced')
})

test('user can open a proof of special morphisms via the URL', async ({ page }) => {
	await page.goto('/category/Grp?proof=epimorphism', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup')

	await expect(popup).toBeVisible()
	await expect(popup).toHaveAccessibleName(/Epimorphisms in/)
})

test('user can follow a link to a proof on another page', async ({ page }) => {
	// both pages have a proof with the same key, which must not interfere
	await page.goto('/category/Alg(R)?proof=Malcev', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup')
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

	const popup = page.locator('.popup')
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

		const popup = page.locator('.popup')
		await expect(popup).toHaveAccessibleName(/has effective cocongruences/)

		const back_button = popup.getByRole('button', { name: 'back to previous proof' })

		await expect(back_button).toHaveCount(0)

		const link = popup.locator('a[href="/category/GrpAct?proof=mono-regular"]').last()
		await link.scrollIntoViewIfNeeded()
		const scroll_top = await popup.evaluate((el) => el.scrollTop)
		expect(scroll_top).toBeGreaterThan(0)

		const page_scroll_y = await page.evaluate(() => window.scrollY)

		await link.click()

		await expect(page).toHaveURL('/category/GrpAct?proof=mono-regular')
		await expect(back_button).toBeVisible()
		await expect(popup).toHaveAccessibleName(/is mono-regular/)
		await expect
			.poll(() => page.evaluate(() => window.scrollY))
			.not.toBe(page_scroll_y)

		if (via === 'browser') {
			await page.goBack()
		} else {
			await back_button.click()
		}

		await expect(page).toHaveURL('/category/GrpAct?proof=effective_cocongruences')
		await expect(back_button).toHaveCount(0)
		await expect(popup).toHaveAccessibleName(/has effective cocongruences/)
		await expect(popup).toContainText('good pushouts of monomorphisms')
		await expect.poll(() => popup.evaluate((el) => el.scrollTop)).toBe(scroll_top)
		await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(page_scroll_y)
	})
}

test('following a link to a nearby proof does not scroll to the top', async ({
	page
}) => {
	await page.goto('/category/BC?proof=regular_monomorphism', {
		waitUntil: 'networkidle'
	})

	const popup = page.locator('.popup')
	await expect(popup).toContainText('precisely the monomorphisms')

	const scroll_y = await page.evaluate(() => window.scrollY)
	expect(scroll_y).toBeGreaterThan(0)

	await page.evaluate(() => {
		const w = window as unknown as { scroll_samples: number[] }
		w.scroll_samples = []
		const sample = () => {
			w.scroll_samples.push(window.scrollY)
			requestAnimationFrame(sample)
		}
		sample()
	})

	await popup.locator('a[href="/category/BC?proof=monomorphism"]').click()

	await expect(page).toHaveURL('/category/BC?proof=monomorphism')
	await expect(popup).not.toContainText('precisely the monomorphisms')

	// wait until the page has stopped scrolling
	await page.evaluate(
		() =>
			new Promise<void>((resolve) => {
				let timer = setTimeout(resolve, 300)
				window.addEventListener('scroll', () => {
					clearTimeout(timer)
					timer = setTimeout(resolve, 300)
				})
			})
	)

	await expect(page.locator('.wrapper.expanded')).toBeInViewport()

	const samples = await page.evaluate(
		() => (window as unknown as { scroll_samples: number[] }).scroll_samples
	)
	expect(Math.min(...samples)).toBeGreaterThan(scroll_y / 2)
})

test('expanding and collapsing a proof updates the URL', async ({ page }) => {
	await page.goto('/category/Grp?proof=mono-regular', { waitUntil: 'networkidle' })

	const popup = page.locator('.popup')

	await popup.getByRole('button', { name: 'expand' }).click()

	await expect(page).toHaveURL('/category/Grp?proof=mono-regular&expanded=true')
	await expect.poll(() => is_full_height(popup)).toBe(true)

	await popup.getByRole('button', { name: 'collapse' }).click()

	await expect(page).toHaveURL('/category/Grp?proof=mono-regular')
	await expect.poll(() => is_full_height(popup)).toBe(false)
})

test('user can open an expanded proof via the URL', async ({ page }) => {
	await page.goto('/category/Grp?proof=mono-regular&expanded=true', {
		waitUntil: 'networkidle'
	})

	const popup = page.locator('.popup')

	await expect(popup).toBeVisible()
	await expect.poll(() => is_full_height(popup)).toBe(true)
})

test('closing an expanded proof removes it from the URL', async ({ page }) => {
	await page.goto('/category/Grp?proof=mono-regular&expanded=true', {
		waitUntil: 'networkidle'
	})

	const popup = page.locator('.popup')

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(page).toHaveURL('/category/Grp')
})

test('following a link from an expanded proof keeps it expanded', async ({ page }) => {
	await page.goto('/category/Grp_fg?proof=aleph1-cofiltered_limits&expanded=true', {
		waitUntil: 'networkidle'
	})

	const popup = page.locator('.popup')

	await popup.locator('a[href="/category/Grp_fg?proof=kernels"]').click()

	await expect(page).toHaveURL('/category/Grp_fg?proof=kernels&expanded=true')
	await expect.poll(() => is_full_height(popup)).toBe(true)

	await page.goBack()

	await expect(page).toHaveURL(
		'/category/Grp_fg?proof=aleph1-cofiltered_limits&expanded=true'
	)
	await expect.poll(() => is_full_height(popup)).toBe(true)
})
