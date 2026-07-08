<script lang="ts">
	import { goto } from '$app/navigation'
	import Selection from '$components/Selection.svelte'
	import { encode_property_ID } from '$lib/commons/property.utils'
	import MetaData from '$components/MetaData.svelte'
	import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
	import { navigating } from '$app/state'
	import { browser } from '$app/environment'
	import type { StructureType } from '$lib/commons/types'
	import { PLURALS } from '$lib/commons/structures'
	import type { Snippet } from 'svelte'

	type Props = {
		all_properties: string[]
		type: StructureType
		children: Snippet
	}

	let { all_properties, type, children }: Props = $props()

	let satisfied_properties: string[] = $state([])
	let unsatisfied_properties: string[] = $state([])

	let is_valid_search = $derived(
		satisfied_properties.length > 0 || unsatisfied_properties.length > 0
	)

	$effect(() => {
		preload_search_config()
	})

	function preload_search_config() {
		if (!browser) return

		const saved_search_txt = window.sessionStorage.getItem(`${type}-search`)
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

		const url = new URL(`/${type}-search/results`, window.location.origin)

		if (satisfied_query) url.searchParams.set('satisfied', satisfied_query)
		if (unsatisfied_query) url.searchParams.set('unsatisfied', unsatisfied_query)

		goto(url)
	}

	function reset() {
		if (browser) window.sessionStorage.removeItem(`${type}-search`)
		satisfied_properties = []
		unsatisfied_properties = []
	}

	let is_searching = $derived(navigating.to?.route.id === `/${type}-search/results`)
</script>

<MetaData
	title="Property combo search"
	description="Search for {PLURALS[
		type
	]} that satisfy a specific set of properties while simultaneously not satisfying another set of properties. "
/>

<h2>Property combo search</h2>

<p class="hint">
	{@render children()}
</p>

<Selection
	bind:selected_items={satisfied_properties}
	allowed_items={all_properties}
	section_label="Satisfied properties"
	item_label="Satisfied property"
>
	<p>Looking for {PLURALS[type]} with these properties:</p>
</Selection>

<Selection
	bind:selected_items={unsatisfied_properties}
	allowed_items={all_properties}
	section_label="Unsatisfied properties"
	item_label="Unsatisfied property"
>
	<p>... and <i>not</i> with these properties:</p>
</Selection>

<menu>
	<button
		type="button"
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
