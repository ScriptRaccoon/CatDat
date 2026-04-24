<script lang="ts">
	import { browser } from '$app/environment'
	import { encode_property_ID, get_property_url } from '$lib/commons/property.url'
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

{#if data.satisfied_properties.length > 0}
	<div>
		<span>Satisfied properties:</span>

		{#each data.satisfied_properties as property, index}
			<a href={get_property_url(property, 'functor')}>{property}</a
			>{#if index < data.satisfied_properties.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</div>
{/if}

{#if data.unsatisfied_properties.length > 0}
	<div>
		<span>Unsatisfied properties:</span>

		{#each data.unsatisfied_properties as property, index}
			<a href={get_property_url(property, 'functor')}>{property}</a
			>{#if index < data.unsatisfied_properties.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</div>
{/if}

<p class="hint">
	{pluralize(data.found_objects.length, {
		one: 'Found {count} functor',
		other: 'Found {count} functors',
	})}
</p>

<FunctorList functors={data.found_objects ?? []} />

<menu>
	<a class="button" href="/functor-search">Adjust search</a>

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
