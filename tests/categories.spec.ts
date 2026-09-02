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
		.getByRole('link', {
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
		.getByRole('link', {
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

	const body = page.locator('body')

	await expect(body).toContainText('Objects commutative rings')
	await expect(body).toContainText('Morphisms ring homomorphisms')
	await expect(page.getByRole('link', { name: 'nLab link' })).toBeVisible()
	await expect(body).toContainText('is cocomplete')
	await expect(body).toContainText('is locally finitely presentable')
	await expect(body).toContainText('is not additive')
	await expect(body).toContainText('is not balanced')
	await expect(body).toContainText('terminal object: zero ring')
	await expect(body).toContainText('coproducts: tensor products')
	await expect(body).toContainText('regular epimorphisms: surjective morphisms')
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

	const unknown_properties_section = page.locator('section', {
		hasText: 'Unknown properties'
	})

	const link = unknown_properties_section.locator('li').first()

	await expect(link).toBeVisible()
})

test('user may see undecidable properties', async ({ page }) => {
	await page.goto('/category/FreeAb')

	await expect(
		page.getByRole('heading', {
			name: 'category of free abelian groups',
			exact: true
		})
	).toBeVisible()

	const undecidable_properties_section = page.locator('section', {
		hasText: 'Undecidable properties'
	})

	const link = undecidable_properties_section.getByRole('link', {
		name: 'accessible',
		exact: true
	})

	await expect(link).toBeVisible()
})

test('user may see properties that cannot be determined in a family of categories', async ({
	page
}) => {
	await page.goto('/category/BG')

	await expect(
		page.getByRole('heading', {
			name: 'delooping of a group',
			exact: true
		})
	).toBeVisible()

	const undecidable_properties_section = page.locator('section', {
		hasText: 'Undecidable properties'
	})

	const link = undecidable_properties_section.getByRole('link', {
		name: 'finite',
		exact: true
	})

	await expect(link).toBeVisible()
})

test('user can navigate to a related category', async ({ page }) => {
	await page.goto('/category/FinSet', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Related") + span')
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

	await page
		.locator('strong:has-text("Dual") + span')
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

test('user can navigate to a child category', async ({ page }) => {
	await page.goto('/category/BG', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Children") + span')
		.getByRole('link', {
			name: 'delooping of a non-trivial finite group',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'delooping of a non-trivial finite group',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/BG_f')
})

test('user can navigate to a parent category', async ({ page }) => {
	await page.goto('/category/Ring', { waitUntil: 'networkidle' })

	await page
		.locator('strong:has-text("Parent") + span')
		.getByRole('link', {
			name: 'category of algebras',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of algebras',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/Alg(R)')
})

test('user can open and close a proof for a property of a category', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { hasText: 'is mono-regular' })

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
	await page.goto('/category/Ring', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { hasText: 'has an extremal generator' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Since it is one-sorted finitary algebraic, it has an extremal generator'
	)
})

test('user can open a proof for a deduced unsatisfied property of a category', async ({
	page
}) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { hasText: 'is not cartesian closed' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText(
		'Assume for contradiction that it is cartesian closed.'
	)
})

test('user can open a proof for an inherited satisfied property of a category', async ({
	page
}) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { hasText: 'is abelian' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText('This follows from the parent.')
})

test('user can open a proof for an inherited unsatisfied property of a category', async ({
	page
}) => {
	await page.goto('/category/BG_f', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { hasText: 'is not thin' })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(popup).toContainText('This follows from the parent.')
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

test('user sees morphisms associated with the given category', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('link', {
			name: 'embedding of A3 into S3',
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'identity map of a group',
			exact: true
		})
	).toBeVisible()
})

test('user sees symmetric monoidal categories for the given category', async ({
	page
}) => {
	await page.goto('/category/Top', { waitUntil: 'networkidle' })

	await expect(
		page.getByRole('link', {
			name: 'cartesian symmetric monoidal category of topological spaces',
			exact: true
		})
	).toBeVisible()
})
