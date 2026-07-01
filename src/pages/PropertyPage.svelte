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
	import type {
		ImplicationDisplay,
		PropertyDisplay,
		StructureShort,
		StructureType,
	} from '$lib/commons/types'
	import { PLURALS } from '$lib/commons/structures'
	import TagList from '$components/TagList.svelte'

	type Props = {
		type: StructureType
		property: PropertyDisplay
		related_properties: string[]
		tags: string[]
		examples: StructureShort[]
		counterexamples: StructureShort[]
		unknown_structures: StructureShort[]
		undecidable_structures: StructureShort[]
		relevant_implications: ImplicationDisplay[]
	}

	let {
		type,
		property,
		related_properties,
		tags,
		examples,
		counterexamples,
		unknown_structures,
		undecidable_structures,
		relevant_implications,
	}: Props = $props()
</script>

<MetaData title={property.id} description="Discover this property of {PLURALS[type]}" />

<h2>{property.id}</h2>

<TagList {tags} {type} sort="property" />

<p>
	{@html property.description}

	{#if property.invariant_under_equivalences === false}
		Warning: This property is not <a
			href="https://ncatlab.org/nlab/show/principle+of+equivalence"
			target="_blank">invariant under equivalences</a
		>.
	{/if}
</p>

{#if property.dual_property_id || related_properties.length || property.nlab_link}
	<ul class="with-margins">
		{#if property.dual_property_id}
			<li>
				<strong><a href="/content/dual-properties">Dual property:</a></strong>
				<a href={get_property_url(property.dual_property_id, type)}
					>{property.dual_property_id}</a
				>
				{#if property.dual_property_id === property.id}
					(self-dual)
				{/if}
			</li>
		{/if}

		{#if related_properties.length}
			<li>
				<strong>Related properties:</strong>
				{#each related_properties as related_property, i}
					<a href={get_property_url(related_property, type)}>
						{related_property}
					</a>{#if i < related_properties.length - 1}
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

<HelpMessage id="implication-link">
	New here? Click any <Fa icon={faInfoCircle} /> icon to view the proof for that implication.
</HelpMessage>

<h3 class="sticky-heading">Relevant implications</h3>

<ImplicationList
	implications={relevant_implications}
	highlighted_property={property.id}
	{type}
/>

<h3 class="sticky-heading">Examples</h3>

<p class="hint">
	{pluralize(examples.length, {
		one: `There is {count} ${type} with this property.`,
		other: `There are {count} ${PLURALS[type]} with this property.`,
	})}
</p>

<StructureList structures={examples} {type} />

<h3 class="sticky-heading">Counterexamples</h3>

<p class="hint">
	{pluralize(counterexamples.length, {
		one: `There is {count} ${type} without this property.`,
		other: `There are {count} ${PLURALS[type]} without this property.`,
	})}
</p>

<StructureList structures={counterexamples} {type} />

{#if undecidable_structures.length}
	<h3 class="sticky-heading">Undecidable {PLURALS[type]}</h3>

	<p class="hint">
		{pluralize(undecidable_structures.length, {
			one: `There is {count} ${type} for which it cannot be decided if this property is satisfied or not.`,
			other: `There are {count} ${PLURALS[type]} for which it cannot be decided if this property is satisfied or not.`,
		})}
	</p>

	<StructureList structures={undecidable_structures} {type} />
{/if}

<h3 class="sticky-heading">Unknown</h3>

<p class="hint">
	{pluralize(unknown_structures.length, {
		one: `There is {count} ${type} for which the database has no information on whether it satisfies this property.`,
		other: `There are {count} ${PLURALS[type]} for which the database has no information on whether they satisfy this property.`,
	})}
	{#if unknown_structures.length > 0}
		Please help us fill in the gaps by
		<a href="/content/contribute">contributing</a> to this project.
	{/if}
</p>

<StructureList structures={unknown_structures} {type} />

<SuggestionForm />
