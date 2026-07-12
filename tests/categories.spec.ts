import { test, expect } from '@playwright/test'

test('user can navigate to a category', async ({ page }) => {
	await page.goto('/')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Categories',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'List of categories',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category-list')

	await page
		.getByRole('link', {
			name: 'category of commutative rings',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of commutative rings',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/CRing')
})

test("user can navigate to categories tagged with 'analysis' from the category list page", async ({
	page
}) => {
	await page.goto('/category-list', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
			name: 'analysis',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Categories tagged with 'analysis'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of measurable spaces',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to categories tagged with 'algebra' from the category detail page", async ({
	page
}) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
			name: 'algebra',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Categories tagged with 'algebra'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'category of finite groups',
			exact: true
		})
	).toBeVisible()
})

test('user can view category details', async ({ page }) => {
	await page.goto('/category/CRing')

	await expect(
		page.getByRole('heading', {
			name: 'category of commutative rings',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText('objects: commutative rings')).toBeVisible()
	await expect(page.getByText('morphisms: ring homomorphisms')).toBeVisible()
	await expect(page.getByRole('link', { name: 'nLab link' })).toBeVisible()
	await expect(page.getByText('is cocomplete')).toBeVisible()
	await expect(page.getByText('is locally finitely presentable')).toBeVisible()
	await expect(page.getByText('is not additive')).toBeVisible()
	await expect(page.getByText('is not balanced')).toBeVisible()
	await expect(page.getByText('terminal object: zero ring')).toBeVisible()
	await expect(page.getByText('coproducts: tensor products')).toBeVisible()
	await expect(
		page.getByText('regular epimorphisms: surjective morphisms')
	).toBeVisible()
})

test('user sees no unknown properties for the category of sets', async ({ page }) => {
	await page.goto('/category/Set')

	const unknown_properties_section = page.locator('section', {
		hasText: 'Unknown properties'
	})
	await expect(unknown_properties_section.locator('li')).toHaveCount(0)
})

// this can be changed as soon as all properties have been decided for Sh(X)
test('user may see unknown properties', async ({ page }) => {
	await page.goto('/category/Sh(X)')

	await expect(
		page.getByRole('heading', {
			name: 'category of sheaves',
			exact: true
		})
	).toBeVisible()

	const unknown_properties_section = page
		.locator('section', {
			hasText: 'Unknown properties'
		})
		.first()

	const unknown_property_link = unknown_properties_section.locator('li').first()

	await expect(unknown_property_link).toBeVisible()
})

test('user may see undecidable properties', async ({ page }) => {
	await page.goto('/category/FreeAb')

	await expect(
		page.getByRole('heading', {
			name: 'category of free abelian groups',
			exact: true
		})
	).toBeVisible()

	const undecidable_properties_section = page
		.locator('section', {
			hasText: 'Undecidable properties'
		})
		.first()

	const link = undecidable_properties_section.getByRole('link', {
		name: 'accessible',
		exact: true
	})

	await expect(link).toBeVisible()
})

test('user can navigate to a related category', async ({ page }) => {
	await page.goto('/category/FinSet', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'category of sets',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of sets',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Set')
})

test('user can navigate to the dual category if it exists in the database', async ({
	page
}) => {
	await page.goto('/category/Set')

	await expect(
		page.getByRole('heading', {
			name: 'category of sets',
			exact: true
		})
	).toBeVisible()

	const item = page.locator('li', {
		hasText: 'Dual category'
	})

	await item
		.getByRole('link', {
			name: 'dual of the category of sets',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'dual of the category of sets',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Set_op')
})

test('user can open and close a proof for a property of a category', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is mono-regular') })

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

test('user can open a proof for a deduced satisfied property of category', async ({
	page
}) => {
	await page.goto('/category/Set', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('has a generator') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Since it is finitary algebraic, it has a generator')
	).toBeVisible()
})

test('user can open a proof for a deduced unsatisfied property of a category', async ({
	page
}) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is not cartesian closed') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Assume for contradiction that it is cartesian closed.')
	).toBeVisible()
})

test('user sees functors associated with the given category', async ({ page }) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('link', {
			name: 'abelianization functor for groups',
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
