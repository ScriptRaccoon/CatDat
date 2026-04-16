<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import PropertyList from '$components/PropertyList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize } from '$lib/client/utils'

	let { data } = $props()
</script>

<MetaData title="Properties of functors" />

<h2>Properties of Functors</h2>

<!-- TODO: add search feature if the list grows in the future -->

<p class="hint">
	{pluralize(data.properties.length, {
		one: 'Found {count} property',
		other: 'Found {count} properties',
	})}
</p>

<PropertyList properties={data.properties} type="functor" />

<SuggestionForm />
