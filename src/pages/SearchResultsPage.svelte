<script lang="ts">
	import { browser } from '$app/environment'
	import StructureList from '$components/StructureList.svelte'
	import { encode_property_ID, get_property_url } from '$shared/property.utils'
	import MetaData from '$components/MetaData.svelte'
	import { SEARCH_SEPARATOR } from '$lib/commons/search.config'
	import { pluralize } from '$shared/utils'
	import Fa from 'svelte-fa'
	import { faWarning } from '@fortawesome/free-solid-svg-icons'
	import type { SearchResults, StructureType } from '$lib/commons/types'
	import { PLURALS } from '$shared/config'

	type Props = { type: StructureType } & SearchResults

	let {
		type,
		satisfied_properties,
		unsatisfied_properties,
		dual_satisfied_properties,
		dual_unsatisfied_properties,
		dual_search_available,
		found_structures,
		contradiction
	}: Props = $props()

	function get_dual_search_results_link() {
		if (!dual_search_available || !browser) return '/'

		const satisfied_query = (dual_satisfied_properties as string[])
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const unsatisfied_query = (dual_unsatisfied_properties as string[])
			.map(encode_property_ID)
			.join(SEARCH_SEPARATOR)

		const url = new URL(`/${type}-search/results`, window.location.origin)

		if (satisfied_query) url.searchParams.set('satisfied', satisfied_query)
		if (unsatisfied_query) url.searchParams.set('unsatisfied', unsatisfied_query)

		return decodeURIComponent(url.toString())
	}

	$effect(() => {
		window.sessionStorage.setItem(
			`${type}-search`,
			JSON.stringify({ satisfied_properties, unsatisfied_properties })
		)
	})
</script>

<MetaData
	title="Search Results"
	description="{PLURALS[
		type
	]} that satisfy a specific set of properties while simultaneously not satisfying another set of properties."
/>

<h2>Search results</h2>

{#if satisfied_properties.length > 0}
	<div>
		<span>Satisfied properties:</span>

		{#each satisfied_properties as property, index}
			<a href={get_property_url(property, type)}>{property}</a
			>{#if index < satisfied_properties.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</div>
{/if}

{#if unsatisfied_properties.length > 0}
	<div>
		<span>Unsatisfied properties:</span>

		{#each unsatisfied_properties as property, index}
			<a href={get_property_url(property, type)}>{property}</a
			>{#if index < unsatisfied_properties.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</div>
{/if}

{#if !contradiction}
	<p class="hint">
		{pluralize(found_structures.length, {
			one: `Found {count} ${type}`,
			other: `Found {count} ${PLURALS[type]}`
		})}
	</p>

	<StructureList structures={found_structures} {type} />
{:else}
	<p class="hint">
		<Fa icon={faWarning} />
		No {PLURALS[type]} found because the requirements are inconsistent:
	</p>

	<ol class="hint">
		{#each contradiction as segment}
			<li>{segment}</li>
		{/each}
	</ol>
{/if}

<menu>
	<a class="button" href="/{type}-search">Adjust search</a>

	{#if dual_search_available}
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
