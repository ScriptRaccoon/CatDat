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

test("user can navigate to functors tagged with 'topology' from the functor list page", async ({
	page
}) => {
	await page.goto('/functor-list', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
			name: 'topology',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Functors tagged with 'topology'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'path components functor',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to functors tagged with 'algebra' from the category detail page", async ({
	page
}) => {
	await page.goto('/functor/abelianization', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
			name: 'algebra',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Functors tagged with 'algebra'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'torsion functor',
			exact: true
		})
	).toBeVisible()
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
	await expect(page.getByRole('link', { name: 'nLab link' })).toBeVisible()
	await expect(page.getByText('preserves products')).toBeVisible()
	await expect(page.getByText('is essentially surjective')).toBeVisible()
	await expect(page.getByText('is not faithful')).toBeVisible()
	await expect(page.getByText('does not preserve binary coproducts')).toBeVisible()
})

test('user sees no unknown properties for a forgetful functor', async ({ page }) => {
	await page.goto('/functor/forget_vector')

	const unknown_properties_section = page.locator('section', {
		hasText: 'Unknown properties'
	})
	await expect(unknown_properties_section.locator('li')).toHaveCount(0)
})

test('user may see undecidable properties', async ({ page }) => {
	await page.goto('/functor/power_set_covariant')

	await expect(
		page.getByRole('heading', {
			name: 'covariant power set functor',
			exact: true
		})
	).toBeVisible()

	const undecidable_properties_section = page
		.locator('section', {
			hasText: 'Undecidable properties'
		})
		.first()

	const link = undecidable_properties_section.getByRole('link', {
		name: 'essentially injective',
		exact: true
	})

	await expect(link).toBeVisible()
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

test('user can open and close a proof for a property of a functor', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is monadic') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).toBeVisible()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	const text = (await popup.textContent())?.trim() ?? ''

	const proof_text = text.replace(/^Proof/, '').trim()

	expect(proof_text.length).toBeGreaterThan(0)

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).not.toBeVisible()
})

test('user can open a proof for a deduced satisfied property of functor', async ({
	page
}) => {
	await page.goto('/functor/free_group', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is cocontinuous') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Since it is a left adjoint, it is cocontinuous')
	).toBeVisible()
})

test('user can open a proof for a deduced unsatisfied property of a functor', async ({
	page
}) => {
	await page.goto('/functor/pi_1', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is not continuous') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Assume for contradiction that it is continuous.')
	).toBeVisible()
})
