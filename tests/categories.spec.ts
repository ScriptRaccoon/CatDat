import { test, expect } from '@playwright/test'

test('user can navigate to a category', async ({ page }) => {
	await page.goto('/')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Categories',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'List of categories',
			exact: true,
		}),
	).toBeVisible()

	await expect(page).toHaveURL('/category-list')

	await page
		.getByRole('link', {
			name: 'category of commutative rings',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of commutative rings',
			exact: true,
		}),
	).toBeVisible()

	await expect(page).toHaveURL('/category/CRing')
})

test('user can view category details', async ({ page }) => {
	await page.goto('/category/CRing')

	await expect(
		page.getByRole('heading', {
			name: 'category of commutative rings',
			exact: true,
		}),
	).toBeVisible()

	await expect(page.getByText('objects: commutative rings')).toBeVisible()
	await expect(page.getByText('morphisms: ring homomorphisms')).toBeVisible()
	await expect(page.getByText('is cocomplete')).toBeVisible()
	await expect(page.getByText('is locally finitely presentable')).toBeVisible()
	await expect(page.getByText('is not additive')).toBeVisible()
	await expect(page.getByText('is not balanced')).toBeVisible()
	await expect(page.getByText('terminal object: zero ring')).toBeVisible()
	await expect(page.getByText('coproducts: tensor products')).toBeVisible()
	await expect(
		page.getByText('regular epimorphisms: surjective homomorphisms'),
	).toBeVisible()

	const unknown_properties_section = page.locator('section', {
		hasText: 'Unknown properties',
	})
	await expect(unknown_properties_section.locator('li')).toHaveCount(0)
})

// this can be changed as soon as all properties have been decided for Sh(X)
test('user may see unknown properties', async ({ page }) => {
	await page.goto('/category/Sh(X)')

	await expect(
		page.getByRole('heading', {
			name: 'category of sheaves',
			exact: true,
		}),
	).toBeVisible()

	const unknown_properties_section = page
		.locator('section', {
			hasText: 'Unknown properties',
		})
		.first()

	const unknown_property_link = unknown_properties_section.locator('li').first()

	await expect(unknown_property_link).toBeVisible()
})

test('user can navigate to a related category', async ({ page }) => {
	await page.goto('/category/FinSet', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'category of sets',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of sets',
			exact: true,
		}),
	).toBeVisible()

	await expect(page).toHaveURL('/category/Set')
})

test('user can open and close a proof for a category', async ({ page }) => {
	await page.goto('/category/Grp', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is mono-regular') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true,
		}),
	).toBeVisible()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	const text = (await popup.textContent())?.trim() ?? ''

	const proof_text = text.replace(/^Proof/, '').trim()

	expect(proof_text.length).toBeGreaterThan(0)

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true,
		}),
	).not.toBeVisible()
})

test('user can open a derived proof for a category', async ({ page }) => {
	await page.goto('/category/Set', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('has a generator') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Since it is finitary algebraic, it has a generator'),
	).toBeVisible()
})

test('user can navigate to a category property', async ({ page }) => {
	await page.goto('/')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Properties',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Properties of categories',
			exact: true,
		}),
	).toBeVisible()

	await page
		.getByRole('link', {
			name: 'finitely accessible',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'finitely accessible',
			exact: true,
		}),
	).toBeVisible()

	await expect(page).toHaveURL('/category-property/finitely_accessible')
})

test('user can view category property details', async ({ page }) => {
	await page.goto('/category-property/finitely_accessible')

	await expect(
		page.getByRole('heading', {
			name: 'finitely accessible',
			exact: true,
		}),
	).toBeVisible()

	await expect(page.getByText('A category is finitely accessible if')).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'accessible',
			exact: true,
		}),
	).toBeVisible()

	const examples = page
		.getByRole('heading', {
			name: 'Examples',
			exact: true,
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		examples.getByRole('link', {
			name: 'category of fields',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		examples.getByRole('link', {
			name: 'category of vector spaces',
			exact: true,
		}),
	).toBeVisible()

	const counterexamples = page
		.getByRole('heading', {
			name: 'Counterexamples',
			exact: true,
		})
		.locator('xpath=following-sibling::ul[1]')

	await expect(
		counterexamples.getByRole('link', {
			name: 'category of finite sets',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		counterexamples.getByRole('link', {
			name: 'category of topological spaces',
			exact: true,
		}),
	).toBeVisible()
})

test('user sees no unknown categories for the property of being additive', async ({
	page,
}) => {
	await page.goto('/category-property/additive')
	await expect(
		page.getByText(
			'There are 0 categories for which the database has no information on whether they satisfy this property',
		),
	).toBeVisible()
})

test('user can navigate to a category implication', async ({ page }) => {
	await page.goto('/')

	const nav = page.getByRole('navigation')
	await expect(nav).toBeVisible()

	await nav
		.getByRole('link', {
			name: 'Implications',
			exact: true,
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'Category implications',
			exact: true,
		}),
	).toBeVisible()

	const item = page.locator('li', { hasText: /cartesian closed.+finite products/ })
	await expect(item).toBeVisible()

	await item.getByRole('link', { name: 'details' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true,
		}),
	).toBeVisible()

	await expect(page).toHaveURL('/category-implication/ccc_condition')
})

test('user can see the details of an implication', async ({ page }) => {
	await page.goto('/category-implication/ccc_condition')

	await expect(
		page.getByRole('heading', {
			name: 'Implication Details',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'cartesian closed',
			exact: true,
		}),
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'finite products',
			exact: true,
		}),
	).toBeVisible()

	await expect(page.getByText('Proof: This holds by definition')).toBeVisible()
})
