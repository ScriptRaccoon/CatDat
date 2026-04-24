<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize } from '$lib/client/utils'
	import { get_property_url } from '$lib/commons/property.url'

	let { data } = $props()

	let search = $state('')

	let searched_properties = $derived(
		search
			? data.grouped_properties.filter(
					(property) =>
						property.id.toLowerCase().includes(search.toLowerCase()) ||
						property.dual_property_id
							?.toLowerCase()
							.includes(search.toLowerCase()),
				)
			: data.grouped_properties,
	)
</script>

<MetaData title="Properties of categories" />

<h2>Properties of categories</h2>

<SearchFilter bind:search />

<p class="hint">
	{#if !search}
		Found {data.total} properties ({data.grouped_total} grouped)
	{:else}
		{pluralize(searched_properties.length, {
			one: 'Found {count} group',
			other: 'Found {count} groups',
		})}
	{/if}
</p>

<ul>
	{#each searched_properties as { id, relation, dual_property_id }}
		<li>
			{relation}
			<a href={get_property_url(id, 'category')}>{id}</a>
			{#if dual_property_id && id !== dual_property_id}
				/ <a href={get_property_url(dual_property_id, 'category')}>
					{dual_property_id}
				</a>
			{/if}
		</li>
	{/each}
</ul>

<SuggestionForm />
