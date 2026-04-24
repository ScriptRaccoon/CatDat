<script lang="ts">
	import { goto } from '$app/navigation'
	import Selection from '$components/Selection.svelte'
	import { encode_property_ID } from '$lib/commons/property.url'
	import MetaData from '$components/MetaData.svelte'
	import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
	import { navigating } from '$app/state'
	import { browser } from '$app/environment'

	let { data } = $props()

	let satisfied_properties: string[] = $state([])
	let unsatisfied_properties: string[] = $state([])

	let is_valid_search = $derived(
		satisfied_properties.length > 0 || unsatisfied_properties.length > 0,
	)

	$effect(() => {
		preload_search_config()
	})

	function preload_search_config() {
		if (!browser) return

		const saved_search_txt = window.sessionStorage.getItem('category-search')
		if (!saved_search_txt) return

		try {
			const saved_search = JSON.parse(saved_search_txt) as {
				satisfied_properties: string[]
				unsatisfied_properties: string[]
			}
			satisfied_properties = saved_search.satisfied_properties
			unsatisfied_properties = saved_search.unsatisfied_properties
		} catch (_) {}
	}

	function request_search_results() {
		if (!is_valid_search) return

		const satisfied_query = satisfied_properties
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const unsatisfied_query = unsatisfied_properties
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const url = new URL('/category-search/results', window.location.origin)

		if (satisfied_query) url.searchParams.set('satisfied', satisfied_query)
		if (unsatisfied_query) url.searchParams.set('unsatisfied', unsatisfied_query)

		if (browser) {
			window.sessionStorage.setItem(
				'category-search',
				JSON.stringify({ satisfied_properties, unsatisfied_properties }),
			)
		}

		goto(url)
	}

	function reset() {
		if (browser) window.sessionStorage.removeItem('category-search')
		satisfied_properties = []
		unsatisfied_properties = []
	}

	const sample_search_url = `/category-search/results?satisfied=finitely_complete${SEARCH_SEPARATOR}pointed&unsatisfied=complete`

	let is_searching = $derived(navigating.to?.route.id === '/category-search/results')
</script>

<MetaData
	title="Property combo search"
	description="Search for categories that satisfy a specific set of properties while simultaneously not satisfying another set of properties."
/>

<h2>Property combo search</h2>

<p class="hint">
	Search for categories with certain properties while excluding others. For example, you
	can <a href={sample_search_url}>look</a>
	for categories that are finitely complete and pointed but not complete.
</p>

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

<menu>
	<button
		class="button"
		onclick={request_search_results}
		disabled={is_searching || !is_valid_search}
	>
		{#if is_searching}
			Searching...
		{:else}
			Search
		{/if}
	</button>

	<button class="button" onclick={reset} disabled={is_searching}>Reset</button>
</menu>

<style>
	menu {
		display: flex;
		gap: 1rem;
	}
</style>
