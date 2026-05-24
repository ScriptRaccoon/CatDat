<script lang="ts">
	import ImplicationList from '$components/ImplicationList.svelte'
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize } from '$lib/client/utils'
	import { get_property_url } from '$lib/commons/property.url'

	let { data } = $props()

	let property = $derived(data.property)
</script>

<MetaData title={property.id} description="Discover this property of functors" />

<h2>{property.id}</h2>

<p>
	{@html property.description}

	{#if property.invariant_under_equivalences === false}
		Warning: This property is not invariant under equivalences.
	{/if}
</p>

{#if data.property.dual_property_id || data.related_properties.length || data.property.nlab_link}
	<ul>
		{#if property.dual_property_id}
			<li>
				<strong>Dual property:</strong>
				<a href={get_property_url(property.dual_property_id, 'functor')}
					>{property.dual_property_id}</a
				>
				{#if property.dual_property_id === property.id}
					(self-dual)
				{/if}
			</li>
		{/if}

		{#if data.related_properties.length}
			<li>
				<strong>Related properties:</strong>
				{#each data.related_properties as related_property, i}
					<a href={get_property_url(related_property, 'functor')}>
						{related_property}
					</a>{#if i < data.related_properties.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

		{#if property.nlab_link}
			<li>
				<a href={property.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}
	</ul>
{/if}

<h3 class="sticky-heading">Relevant implications</h3>

<ImplicationList
	implications={data.relevant_implications}
	highlighted_property={data.property.id}
	type="functor"
/>

<h3 class="sticky-heading">Examples</h3>

<p class="hint">
	{pluralize(data.examples.length, {
		one: 'There is {count} functor with this property.',
		other: 'There are {count} functors with this property.',
	})}
</p>

<StructureList structures={data.examples} type="functor" />

<h3 class="sticky-heading">Counterexamples</h3>

<p class="hint">
	{pluralize(data.counterexamples.length, {
		one: 'There is {count} functor without this property.',
		other: 'There are {count} functors without this property.',
	})}
</p>

<StructureList structures={data.counterexamples} type="functor" />

<h3 class="sticky-heading">Unknown</h3>

<p class="hint">
	{pluralize(data.unknown_functors.length, {
		one: 'There is {count} functor for which the database has no information on whether it satisfies this property.',
		other: 'There are {count} functors for which the database has no information on whether they satisfy this property.',
	})}
	{#if data.unknown_functors.length > 0}
		Please help us fill in the gaps by
		<a href="/content/contribute">contributing</a> to this project.
	{/if}
</p>

<StructureList structures={data.unknown_functors} type="functor" />

<SuggestionForm />
