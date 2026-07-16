import { test, expect } from '@playwright/test'

test('user can navigate to a morphism', async ({ page }) => {
	await page.goto('/morphism-list')

	await page
		.getByRole('link', {
			name: 'universal split epimorphism',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'universal split epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism/universal-split-epi')
})

test("user can navigate to morphisms tagged with 'algebra' from the morphism list page", async ({
	page
}) => {
	await page.goto('/morphism-list', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
			name: 'algebra',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Morphisms tagged with 'algebra'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'embedding of integer into rational numbers',
			exact: true
		})
	).toBeVisible()
})

test("user can navigate to morphisms tagged with 'set theory' from the morphism detail page", async ({
	page
}) => {
	await page.goto('/morphism/id_X', { waitUntil: 'networkidle' })

	await page
		.getByRole('button', {
			name: 'set theory',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: "Morphisms tagged with 'set theory'",
			exact: true
		})
	).toBeVisible()

	await expect(
		page.getByRole('link', {
			name: 'map into the singleton set',
			exact: true
		})
	).toBeVisible()
})

test('user can view morphism details', async ({ page }) => {
	await page.goto('/morphism/universal-split-epi')

	await expect(
		page.getByRole('heading', {
			name: 'universal split epimorphism',
			exact: true
		})
	).toBeVisible()

	await expect(page.getByText('basic example of a split epimorphism')).toBeVisible()
	await expect(page.getByText('is a split epimorphism')).toBeVisible()
	await expect(page.getByText('is a regular epimorphism')).toBeVisible()
	await expect(page.getByText('is not an effective epimorphism')).toBeVisible()
	await expect(page.getByText('is not an isomorphism')).toBeVisible()
})

test('user sees no unknown properties for a basic map', async ({ page }) => {
	await page.goto('/morphism/terminal-map')

	const unknown_properties_section = page.locator('section', {
		hasText: 'Unknown properties'
	})
	await expect(unknown_properties_section.locator('li')).toHaveCount(0)
})

test('user can navigate to a related morphism', async ({ page }) => {
	await page.goto('/morphism/id_X', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'identity map of a group',
			exact: true
		})
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'identity map of a group',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/morphism/id_G')
})

test('user can navigate to the ambient category', async ({ page }) => {
	await page.goto('/morphism/fork-handle', { waitUntil: 'networkidle' })

	await page
		.getByRole('link', {
			name: 'walking fork',
			exact: true
		})
		.first()
		.click()

	await expect(
		page.getByRole('heading', {
			name: 'walking fork',
			exact: true
		})
	).toBeVisible()

	await expect(page).toHaveURL('/category/walking_fork')
})

test('user can open and close a proof for a property of a morphism', async ({ page }) => {
	await page.goto('/morphism/A3-S3-embedding', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is a normal monomorphism') })

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

	expect(proof_text).toContain('normal subgroup')

	await popup.getByRole('button', { name: 'close' }).click()

	await expect(
		page.getByRole('heading', {
			name: 'Proof',
			exact: true
		})
	).not.toBeVisible()
})

test('user can open a proof for a deduced satisfied property of a morphism', async ({
	page
}) => {
	await page.goto('/morphism/terminal-map', { waitUntil: 'networkidle' })

	const claim = page.locator('li', { has: page.getByText('is a strict epimorphism') })

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Since it is a regular epimorphism, it is a strict epimorphism')
	).toBeVisible()
})

test('user can open a proof for a deduced unsatisfied property of a morphism', async ({
	page
}) => {
	await page.goto('/morphism/multiply-2', { waitUntil: 'networkidle' })

	const claim = page.locator('li', {
		has: page.getByText('is not a regular monomorphism')
	})

	await expect(claim).toBeVisible()

	await claim.locator('button').click()

	const popup = page.locator('.popup').filter({ hasText: 'Proof' })

	await expect(
		popup.getByText('Assume for contradiction that it is a regular monomorphism.')
	).toBeVisible()
})
