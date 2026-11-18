import { test, expect } from '@playwright/test'
import { get_property_list } from '../utils'

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
	await expect(
		get_property_list(page, 'Satisfied properties', 'Deduced properties')
	).toContainText('is cocomplete')
	await expect(
		get_property_list(page, 'Satisfied properties', 'Deduced properties')
	).toContainText('is locally finitely presentable')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Deduced properties')
	).toContainText('is not additive')
	await expect(
		get_property_list(page, 'Unsatisfied properties', 'Properties from parent')
	).toContainText('is not balanced')
	await expect(body).toContainText('terminal object: zero ring')
	await expect(body).toContainText('coproducts: tensor products')
	await expect(body).toContainText('regular epimorphisms: surjective morphisms')
})

test('user sees no unknown properties for the category of sets', async ({ page }) => {
	await page.goto('/category/Set')

	await expect(
		page.getByRole('list', { name: 'Unknown properties', exact: true })
	).toHaveCount(0)
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

	const link = page
		.getByRole('list', { name: 'Unknown properties', exact: true })
		.getByRole('listitem')
		.first()

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

	const link = page
		.getByRole('list', { name: 'Undecidable properties', exact: true })
		.getByRole('link', {
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

	const link = page
		.getByRole('list', { name: 'Undecidable properties', exact: true })
		.getByRole('link', {
			name: 'finite',
			exact: true
		})

	await expect(link).toBeVisible()
})

test('user sees the properties from the parent category separately', async ({ page }) => {
	await page.goto('/category/Ab', { waitUntil: 'networkidle' })

	const satisfied_section = page.locator('section', {
		has: page.getByRole('heading', {
			name: 'Satisfied properties',
			exact: true
		})
	})

	await expect(
		get_property_list(page, 'Satisfied properties', 'Properties from parent')
	).toContainText('is abelian')

	await expect(
		get_property_list(page, 'Satisfied properties', 'Deduced properties')
	).not.toContainText('is abelian')

	await satisfied_section
		.getByRole('link', {
			name: 'parent',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'category of left modules over a non-semisimple ring',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/R-Mod_non_ss')
})

test('user sees no properties from a parent for a category without parent', async ({
	page
}) => {
	await page.goto('/category/Set')

	await expect(page.getByText('Properties from parent')).toHaveCount(0)
})
