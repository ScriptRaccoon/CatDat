import { test, expect } from '@playwright/test'
import { get_property_list } from './utils'

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

test('user can search for a functor by its name', async ({ page }) => {
	await page.goto('/functor-list', { waitUntil: 'networkidle' })

	const irrelevant_names = [
		'abelianization functor for groups',
		'fundamental group functor'
	]

	for (const name of irrelevant_names) {
		await expect(page.getByRole('link', { name, exact: true })).toBeVisible()
	}

	await page.getByRole('searchbox', { name: 'search filter' }).fill('power set')

	await expect(
		page.getByRole('link', {
			name: 'covariant power set functor',
			exact: true
		})
	).toBeVisible()

	for (const name of irrelevant_names) {
		await expect(page.getByRole('link', { name, exact: true })).not.toBeVisible()
	}
})

test('user can search for a functor by its keyword', async ({ page }) => {
	await page.goto('/functor-list', { waitUntil: 'networkidle' })

	await page.getByRole('searchbox', { name: 'search filter' }).fill('group completion')

	await expect(
		page.getByRole('link', {
			name: 'enveloping group functor',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'abelianization functor for groups',
			exact: true
		})
	).not.toBeVisible()
})

test("user can navigate to functors tagged with 'topology' from the functor list page", async ({
	page
}) => {
	await page.goto('/functor-list', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
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

test("user can navigate to functors tagged with 'algebra' from the functor detail page", async ({
	page
}) => {
	await page.goto('/functor/abelianization', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
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

	const body = page.locator('body')

	await expect(body).toContainText('group of homotopy classes of loops')
	await expect(page.getByRole('link', { name: 'nLab link' })).toBeVisible()
	await expect(
		get_property_list(page, 'Satisfied properties', 'Assigned properties')
	).toContainText('preserves products')
	await expect(
		get_property_list(page, 'Satisfied properties', 'Deduced properties')
	).toContainText('is essentially surjective')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Assigned properties')
	).toContainText('is not faithful')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Assigned properties')
	).toContainText('does not preserve binary coproducts')
})

test('user sees no unknown properties for a forgetful functor', async ({ page }) => {
	await page.goto('/functor/forget_vector')

	await expect(
		page.getByRole('list', { name: 'Unknown properties', exact: true })
	).toHaveCount(0)
})

test('user may see undecidable properties', async ({ page }) => {
	await page.goto('/functor/power_set_covariant')

	await expect(
		page.getByRole('heading', {
			name: 'covariant power set functor',
			exact: true
		})
	).toBeVisible()

	const link = page
		.getByRole('list', { name: 'Undecidable properties', exact: true })
		.getByRole('link', {
			name: 'essentially injective',
			exact: true
		})

	await expect(link).toBeVisible()
})

test('user can navigate to a related functor', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Related") + span')
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

test('user can navigate to the domain category', async ({ page }) => {
	await page.goto('/functor/forget_ring', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Domain") + span')
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

test('user can navigate to the codomain category', async ({ page }) => {
	await page.goto('/functor/group_units', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Codomain") + span')
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
		.locator('strong:has-text("Left adjoint") + span')
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
		.locator('strong:has-text("Right adjoint") + span')
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

	const claim = get_property_list(page, 'Satisfied properties', 'Assigned properties')
		.getByRole('listitem')
		.filter({ hasText: 'is monadic' })

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

	const claim = get_property_list(page, 'Satisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is cocontinuous' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText('Since it is a left adjoint, it is cocontinuous')
})

test('user can open a proof for a deduced unsatisfied property of a functor', async ({
	page
}) => {
	await page.goto('/functor/pi_1', { waitUntil: 'networkidle' })

	const claim = get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
		.getByRole('listitem')
		.filter({ hasText: 'is not continuous' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText('Assume for contradiction that it is continuous.')
})
