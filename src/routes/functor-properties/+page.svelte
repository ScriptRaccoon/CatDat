<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { get_property_url } from '$lib/commons/property.url'

	let { data } = $props()
</script>

<MetaData title="Properties of functors" />

<h2>Properties of Functors</h2>

<!-- TODO: add search feature if the list grows in the future -->
<!-- TODO: remove code duplication with category properties list page -->

<p class="hint">
	Found {data.total} properties ({data.grouped_total} grouped)
</p>

<ul>
	{#each data.grouped_properties as { id, relation, dual_property_id }}
		<li>
			{relation}
			<a href={get_property_url(id, 'functor')}>{id}</a>
			{#if dual_property_id && id !== dual_property_id}
				/ <a href={get_property_url(dual_property_id, 'functor')}>
					{dual_property_id}
				</a>
			{/if}
		</li>
	{/each}
</ul>

<SuggestionForm />
