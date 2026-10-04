import { test, expect } from '@playwright/test'

test('user sees the heading', async ({ page }) => {
	await page.goto('/')

	await expect(
		page.getByRole('heading', {
			name: 'A comprehensive and searchable database of categorical structures and their properties'
		})
	).toBeVisible()
})

test('user sees the stats card with categorical structures', async ({ page }) => {
	await page.goto('/')

	const card = page.locator('article').filter({
		has: page.locator('.title').getByText('Categorical structures', { exact: true })
	})

	await expect(card).toHaveCount(1)

	const number_element = card.locator('.number')

	await expect(number_element).toHaveClass(/done/) // wait for animation to finish

	const number = Number(
		(await number_element
			.locator('span[aria-hidden="true"]')
			.textContent())!.replaceAll(',', '')
	)

	expect(number).toBeGreaterThan(100)

	await expect(
		card.getByRole('link', {
			name: 'category of groups'
		})
	).toBeVisible()

	await expect(
		card.getByRole('link', {
			name: 'fundamental group functor'
		})
	).toBeVisible()
})

test('user sees the stats card with properties', async ({ page }) => {
	await page.goto('/')

	const card = page.locator('article').filter({
		has: page.locator('.title').getByText('Properties', { exact: true })
	})

	await expect(card).toHaveCount(1)

	const number_element = card.locator('.number')

	await expect(number_element).toHaveClass(/done/) // wait for animation to finish

	const number = Number(
		(await number_element
			.locator('span[aria-hidden="true"]')
			.textContent())!.replaceAll(',', '')
	)

	expect(number).toBeGreaterThan(200)

	await expect(
		card.getByRole('link', {
			name: 'cocomplete',
			exact: true
		})
	).toBeVisible()

	await expect(
		card.getByRole('link', {
			name: 'fully faithful',
			exact: true
		})
	).toBeVisible()
})

test('user sees the stats card with proofs', async ({ page }) => {
	await page.goto('/')

	const card = page.locator('article').filter({
		has: page.locator('.title').getByText('Proofs of properties', { exact: true })
	})

	await expect(card).toHaveCount(1)

	const number_element = card.locator('.number')

	await expect(number_element).toHaveClass(/done/) // wait for animation to finish

	const number = Number(
		(await number_element
			.locator('span[aria-hidden="true"]')
			.textContent())!.replaceAll(',', '')
	)

	expect(number).toBeGreaterThan(20_000)

	await expect(
		card.getByRole('link', {
			name: 'category of Hausdorff spaces'
		})
	).toBeVisible()
})

test('user sees the stats card with implications', async ({ page }) => {
	await page.goto('/')

	const card = page.locator('article').filter({
		has: page.locator('.title').getByText('Implications', { exact: true })
	})

	await expect(card).toHaveCount(1)

	const number_element = card.locator('.number')

	await expect(number_element).toHaveClass(/done/) // wait for animation to finish

	const number = Number(
		(await number_element
			.locator('span[aria-hidden="true"]')
			.textContent())!.replaceAll(',', '')
	)

	expect(number).toBeGreaterThan(500)
})

test('user sees five recently added structures', async ({ page }) => {
	await page.goto('/')

	const section = page.locator('section', {
		has: page.getByRole('heading', { name: 'Recently added structures' })
	})

	await expect(section).toBeVisible()

	const items = section.locator('li')
	await expect(items).toHaveCount(5)
})

test('user can see recently added structures', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	const section = page.locator('section', {
		has: page.getByRole('heading', { name: 'Recently added structures' })
	})

	const items = section.locator('li')
	await expect(items).toHaveCount(5)

	const button = section.getByRole('button', { name: 'Show more' })
	await button.click()

	await expect.poll(() => items.count()).toBeGreaterThan(5)
	await expect(button).toBeHidden()
})

test('user can navigate to a recently added structure', async ({ page }) => {
	await page.goto('/')

	const section = page.locator('section', {
		has: page.getByRole('heading', { name: 'Recently added structures' })
	})

	const link = section.getByRole('link').first()
	const name = (await link.textContent())!.trim()

	await link.click()

	await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
})
