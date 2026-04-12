<script lang="ts">
	import { browser } from '$app/environment'
	import { encode_property_ID } from '$lib/commons/property.url'
	import MetaData from '$components/MetaData.svelte'
	import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
	import { pluralize } from '$lib/client/utils'
	import FunctorList from '$components/FunctorList.svelte'

	let { data } = $props()

	function get_dual_search_results_link() {
		if (!data.dual_search_available || !browser) return '/'

		const satisfied_query = (data.dual_satisfied_properties as string[])
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const unsatisfied_query = (data.dual_unsatisfied_properties as string[])
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const url = new URL('/functor-search/results', window.location.origin)

		if (satisfied_query) url.searchParams.set('satisfied', satisfied_query)
		if (unsatisfied_query) url.searchParams.set('unsatisfied', unsatisfied_query)

		return decodeURIComponent(url.toString())
	}
</script>

<MetaData
	title="Search Results"
	description="Functors that satisfy a specific set of properties while simultaneously not satisfying another set of properties. "
/>

<h2>Search results</h2>

<ul>
	{#if data.satisfied_properties.length > 0}
		<li>
			Satisfied properties: {data.satisfied_properties.join(', ')}
		</li>
	{/if}
	{#if data.unsatisfied_properties.length > 0}
		<li>
			Unsatisfied properties: {data.unsatisfied_properties.join(', ')}
		</li>
	{/if}
</ul>

<p class="hint">
	{pluralize(data.found_functors.length, {
		one: 'Found {count} functor',
		other: 'Found {count} functors',
	})}
</p>

<FunctorList functors={data.found_functors ?? []} />

<menu>
	<a class="button" href="/functor-search">Start new search</a>

	{#if data.dual_search_available}
		<a class="button" href={get_dual_search_results_link()}>Dualize search</a>
	{/if}
</menu>

<style>
	menu {
		margin-top: 2rem;
		display: flex;
		gap: 1rem;
	}
</style>
