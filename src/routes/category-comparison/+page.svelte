<script lang="ts">
	import { goto } from '$app/navigation'
	import { navigating } from '$app/state'
	import MetaData from '$components/MetaData.svelte'
	import Selection from '$components/Selection.svelte'
	import type { CategoryShort } from '$lib/commons/types'
	import { MAX_CATEGORIES_COMPARE } from './compare.config'
	import { get_compared_categories, save_comparison } from './compare.utils'

	let { data } = $props()

	let compared_categories: string[] = $state(get_compared_categories())

	$effect(() => {
		save_comparison(compared_categories)
	})

	let chosen_categories: CategoryShort[] = $derived(
		compared_categories
			.map((name) => data.categories.find((category) => category.name === name))
			.filter((category) => category !== undefined),
	)

	let is_valid_comparison = $derived(
		chosen_categories.length > 0 &&
			chosen_categories.length <= MAX_CATEGORIES_COMPARE,
	)

	function compare_categories() {
		if (!is_valid_comparison) return
		const path = chosen_categories.map((category) => category.id).join('/')
		goto(`/category-comparison/${path}`)
	}

	let is_comparing = $derived(
		navigating.to?.route.id?.startsWith('/category-comparison'),
	)
</script>

<MetaData
	title="Compare categories"
	description="Compare categories based on their properties"
/>

<h2>Compare categories</h2>

<p class="hint">
	Select up to {MAX_CATEGORIES_COMPARE} categories to compare their properties with each other.
	{#if compared_categories.length === MAX_CATEGORIES_COMPARE}
		The maximum is reached.
	{/if}
</p>

<Selection
	allowed_items={data.categories.map((category) => category.name)}
	section_label="selected categories"
	item_label="category"
	bind:selected_items={compared_categories}
	max={MAX_CATEGORIES_COMPARE}
/>

<p>
	<button
		class="button"
		onclick={compare_categories}
		disabled={!is_valid_comparison || is_comparing}
	>
		{#if is_comparing}
			Comparing...
		{:else}
			Compare
		{/if}
	</button>
</p>
