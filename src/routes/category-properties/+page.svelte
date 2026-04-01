<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import PropertyList from '$components/PropertyList.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import { pluralize } from '$lib/client/utils'

	let { data } = $props()

	let search = $state('')

	let searched_properties = $derived(
		search
			? data.properties.filter((property) =>
					property.id.toLowerCase().includes(search.toLowerCase()),
				)
			: data.properties,
	)
</script>

<MetaData title="List of properties" description="All categorical properties" />

<h2>List of properties</h2>

<SearchFilter bind:search />

<p class="hint">
	{pluralize(searched_properties.length, {
		one: 'Found {count} property',
		other: 'Found {count} properties',
	})}
</p>

<PropertyList properties={searched_properties} />
