<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import HelpMessage from '$components/HelpMessage.svelte'
	import ImplicationList from '$components/ImplicationList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize } from '$lib/client/utils'
	import { get_property_url } from '$lib/commons/property.url'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<MetaData title={data.property.id} description="Discover this property of functors" />

<h2>{data.property.id}</h2>

<p>
	{@html data.property.description}

	{#if data.property.invariant_under_equivalences === false}
		Warning: This property is not invariant under equivalences.
	{/if}
</p>

{#if data.property.dual_property_id || data.related_properties.length || data.property.nlab_link}
	<ul>
		{#if data.property.dual_property_id}
			<li>
				<strong>Dual property:</strong>
				<a href={get_property_url(data.property.dual_property_id, 'functor')}
					>{data.property.dual_property_id}</a
				>
				{#if data.property.dual_property_id === data.property.id}
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

		{#if data.property.nlab_link}
			<li>
				<a href={data.property.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}
	</ul>
{/if}
<HelpMessage id="implication-link">
	New here? Click any <Fa icon={faInfoCircle} /> icon to view the proof for that implication.
</HelpMessage>

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

{#if data.undecidable_functors.length}
	<h3 class="sticky-heading">Undecidable functors</h3>

	<p class="hint">
		{pluralize(data.undecidable_functors.length, {
			one: 'There is {count} functor for which it cannot be decided if this property is satisfied or not.',
			other: 'There are {count} functors for which it cannot be decided if this property is satisfied or not.',
		})}
	</p>

	<StructureList structures={data.undecidable_functors} type="functor" />
{/if}

<SuggestionForm />
