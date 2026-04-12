<script lang="ts">
	import { goto } from '$app/navigation'
	import { fade } from 'svelte/transition'
	import { browser } from '$app/environment'
	import CategoryList from '$components/CategoryList.svelte'
	import Selection from '$components/Selection.svelte'
	import { encode_property_ID } from '$lib/commons/property.url'
	import MetaData from '$components/MetaData.svelte'
	import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
	import { pluralize } from '$lib/client/utils'
	import { navigating } from '$app/state'

	let { data } = $props()

	// svelte-ignore state_referenced_locally
	let satisfied_properties = $state(data.satisfied_properties)
	// svelte-ignore state_referenced_locally
	let unsatisfied_properties = $state(data.unsatisfied_properties)

	function request_search_results() {
		const satisfied_query = satisfied_properties
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const unsatisfied_query = unsatisfied_properties
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const url = new URL('/category-search', window.location.origin)

		if (satisfied_query) url.searchParams.set('satisfied', satisfied_query)
		if (unsatisfied_query) url.searchParams.set('unsatisfied', unsatisfied_query)

		goto(url, { invalidateAll: true })
	}

	function get_dual_search_results_link() {
		if (!data.dual_search_available || !browser) return '/'

		const satisfied_query = (data.dual_satisfied_properties as string[])
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const unsatisfied_query = (data.dual_unsatisfied_properties as string[])
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const url = new URL('/category-search', window.location.origin)

		if (satisfied_query) url.searchParams.set('satisfied', satisfied_query)
		if (unsatisfied_query) url.searchParams.set('unsatisfied', unsatisfied_query)

		return decodeURIComponent(url.toString())
	}

	const sample_search_url = `/category-search?satisfied=finitely_complete${SEARCH_SEPARATOR}pointed&unsatisfied=complete`

	let is_searching = $derived(navigating.to?.route.id === '/category-search')
</script>

<MetaData
	title="Property combo search"
	description="Search for categories that satisfy a specific set of properties while simultaneously not satisfying another set of properties. "
/>

<h2>Property combo search</h2>

<p class="hint">
	Search for categories with certain properties while excluding others. For example, you
	can <a href={sample_search_url} data-sveltekit-reload="true">look</a>
	for categories that are finitely complete and pointed but not complete.
</p>

<div class="form">
	<Selection
		title="Looking for categories with these properties:"
		bind:selected_items={satisfied_properties}
		allowed_items={data.all_properties}
		section_label="Satisfied properties"
		item_label="Satisfied property"
	/>

	<Selection
		title="... and <i>not</i> with these properties:"
		bind:selected_items={unsatisfied_properties}
		allowed_items={data.all_properties}
		section_label="Unsatisfied properties"
		item_label="Unsatisfied property"
	/>

	<button
		type="button"
		class="button"
		onclick={request_search_results}
		disabled={is_searching}
	>
		{#if is_searching}
			Searching...
		{:else}
			Search
		{/if}
	</button>
</div>

{#if data.is_search && !is_searching}
	<section transition:fade={{ duration: 150 }}>
		<h2>Results</h2>

		{#if data.is_consistent}
			<p class="hint">
				{pluralize(data.found_categories.length, {
					one: 'Found {count} category',
					other: 'Found {count} categories',
				})}
			</p>
			<CategoryList categories={data.found_categories ?? []} />
		{:else}
			<p>No categories found because the requirements are inconsistent.</p>
		{/if}

		{#if data.dual_search_available}
			<p class="hint">
				All selected properties have a dual, you may perform the
				<a href={get_dual_search_results_link()} data-sveltekit-reload="true">
					dual search
				</a>.
			</p>
		{/if}
	</section>
{/if}

<style>
	.form {
		margin-bottom: 2rem;
	}
</style>
