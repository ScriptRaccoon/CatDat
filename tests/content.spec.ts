import { test, expect } from '@playwright/test'

test('user can navigate to the foundations page', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'Foundations',
			exact: true
		})
		.click()

	await expect(page).toHaveURL('/content/foundations')

	await expect(
		page.getByRole('heading', {
			name: 'Foundations',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('Grothendieck universes')
	await expect(body).toContainText('collections')
	await expect(body).toContainText('functor category')
})

test('user can navigate to the contributions page', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('link', {
			name: 'Contribute',
			exact: true
		})
		.click()

	await expect(page).toHaveURL('/content/contribute')

	await expect(
		page.getByRole('heading', {
			name: 'How to contribute',
			exact: true
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('GitHub repository')
	await expect(body).toContainText('suggestion form')
	await expect(body).toContainText('pull request')
})

test('user can access a content page from the list page', async ({ page }) => {
	await page.goto('/content')

	await expect(
		page.getByRole('heading', {
			name: 'Content pages',
			exact: true
		})
	).toBeVisible()

	await page.getByRole('link', { name: 'Cocongruences of groups' }).click()

	await expect(page).toHaveURL('/content/cocongruences_of_groups')

	await expect(
		page.getByRole('heading', {
			name: 'Cocongruences of groups'
		})
	).toBeVisible()

	const body = page.locator('body')

	await expect(body).toContainText('good pushouts of monomorphisms')
	await expect(body).toContainText('Choose a system of representatives')
})

test('user can view referencing categories on a content page', async ({ page }) => {
	await page.goto('/content/cocongruences_of_groups')

	await expect(page.locator('body')).toContainText(
		'This page is referenced by the following categories.'
	)

	const structures = page.getByRole('list', {
		name: 'Referencing categories',
		exact: true
	})

	await expect(
		structures.getByRole('link', {
			name: 'category of groups',
			exact: true
		})
	).toBeVisible()
})

test('user can follow a link to a result on a content page', async ({ page }) => {
	await page.goto('/category/Ban?proof=cartesian_filtered_colimits')

	await page
		.getByRole('link', {
			name: 'Lemma 10 on subcategories',
			exact: true
		})
		.click()

	await expect(page).toHaveURL('/content/subcategories#lemma_10')

	await expect(page.locator('#lemma_10')).toBeInViewport()
	await expect(page.locator('#lemma_10')).toContainText('Lemma 10.')

	const get_border_color = (id: string) =>
		page.locator(id).evaluate((element) => getComputedStyle(element).borderColor)

	await expect
		.poll(async () => await get_border_color('#lemma_10'))
		.not.toBe(await get_border_color('#lemma_9'))
})

test('user can open a proof that is cited on a content page', async ({ page }) => {
	await page.goto('/content/uniform-embeddings-pushouts')

	await page.getByRole('link', { name: 'construction', exact: true }).click()

	await expect(page).toHaveURL('/category/Unif?proof=cocomplete')

	const popup = page.locator('.popup')

	await expect(popup).toBeVisible()
	await expect(popup).toContainText('finest uniform structure')
})
