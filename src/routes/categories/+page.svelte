<script lang="ts">
	import CategoryList from '$components/CategoryList.svelte'
	import Chip from '$components/Chip.svelte'
	import ChipGroup from '$components/ChipGroup.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { filter_by_tag, normalize_text, pluralize } from '$lib/client/utils'

	let { data } = $props()

	let search = $state('')

	let searched_categories = $derived(
		search
			? data.categories.filter((category) =>
					normalize_text(category.name).includes(normalize_text(search)),
				)
			: data.categories,
	)
</script>

<MetaData title="List of categories" />

<section>
	<h2>List of categories</h2>

	<SearchFilter bind:search />

	<p class="hint">
		{pluralize(searched_categories.length, {
			one: 'Found {count} category',
			other: 'Found {count} categories',
		})}
	</p>

	<CategoryList categories={searched_categories} />
</section>

<section>
	<h2>List of tags</h2>

	<ChipGroup>
		{#each data.tags as tag}
			<Chip size="small" handle_click={() => filter_by_tag(tag)}>{tag}</Chip>
		{/each}
	</ChipGroup>
</section>

<SuggestionForm />

<style>
	section + section {
		margin-top: 2rem;
	}
</style>
