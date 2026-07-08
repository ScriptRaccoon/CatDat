import { test, expect } from '@playwright/test'

test('user can navigate to a functor', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'functors',
			exact: true
		})
		.first()
		.click()

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Functors',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'List of functors',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-list')

	await page
		.getByRole('link', {
			name: 'fundamental group functor',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'fundamental group functor',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/pi_1')
})

test('user can view functor details', async ({ page }) => {
	await page.goto('/functor/pi_1')

	await expect(
		page.getByRole('heading', {
			name: 'fundamental group functor',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText('group of homotopy classes of loops')).toBeVisible()

	await expect(page.getByText('preserves products')).toBeVisible()
	await expect(page.getByText('is essentially surjective')).toBeVisible()

	await expect(page.getByText('is not faithful')).toBeVisible()
	await expect(page.getByText('does not preserve binary coproducts')).toBeVisible()
})

test('user can navigate to a related functor', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'forgetful functor for groups',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'forgetful functor for groups',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/forget_group')
})

test('user can navigate to the source category', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'category of rings',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of rings',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Ring')
})

test('user can navigate to the target category', async ({ page }) => {
	await page.goto('/functor/group_units', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'category of groups',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of groups',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Grp')
})

test('user can navigate to the left adjoint functor', async ({ page }) => {
	await page.goto('/functor/group_units', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'forgetful functor from groups to monoids',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'forgetful functor from groups to monoids',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/forget_inverses')
})

test('user can navigate to the right adjoint functor', async ({ page }) => {
	await page.goto('/functor/forget_topology', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'indiscrete topology functor',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'indiscrete topology functor',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor/indiscrete_topology')
})

test('user can open and close a derived proof for a functor', async ({ page }) => {
	await page.goto('/functor/free_group', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is cocontinuous') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).toBeVisible()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Since it is a left adjoint, it is cocontinuous')
	).toBeVisible()

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).not.toBeVisible()
})

test('user can navigate to a functor property', async ({ page }) => {
	await page.goto('/functor-list')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Properties',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Properties of functors',
			exact: true
		})
	).toBeVisible()

	await page
		.getByRole('link', {
			name: 'faithful',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'faithful',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/functor-property/faithful')
})

test('user can view functor property details', async ({ page }) => {
	await page.goto('/functor-property/faithful')

	await expect(
		page.getByRole('heading', {
			name: 'faithful',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText('is faithful when')).toBeVisible()

	await expect(
		page
			.getByRole('link', {
				name: 'fully faithful',
				exact: true
			})
			.first()
	).toBeVisible()

	const examples = page
		.getByRole('heading', {
			name: 'Examples',
			exact: true
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		examples.getByRole('link', {
			name: 'forgetful functor for rings',
			exact: true
		})
	).toBeVisible()

	await expect(
		examples.getByRole('link', {
			name: 'free group functor',
			exact: true
		})
	).toBeVisible()

	const counterexamples = page
		.getByRole('heading', {
			name: 'Counterexamples',
			exact: true
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		counterexamples.getByRole('link', {
			name: 'abelianization functor for groups',
			exact: true
		})
	).toBeVisible()

	await expect(
		counterexamples.getByRole('link', {
			name: 'fundamental group functor',
			exact: true
		})
	).toBeVisible()
})
