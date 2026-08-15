<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize, remove_underscores } from '$shared/utils'
	import { get_property_url } from '$shared/property.utils'
	import type {
		ImplicationDisplay,
		StructureShort,
		AssociatedTypes,
		StructureType
	} from '$lib/commons/types'
	import { PLURALS } from '$shared/config'

	type Props = {
		type: StructureType
		implication: ImplicationDisplay
		structures: StructureShort[]
		associated_types: AssociatedTypes
		property_relation_dict: Record<string, Record<string, string>>
	}

	let {
		type,
		implication,
		structures,
		associated_types,
		property_relation_dict
	}: Props = $props()

	let has_associated_assumptions = $derived(
		Object.values(implication.associated_assumptions).some((list) => list?.size)
	)
</script>

<MetaData title="Implication Details" />

<h2>Implication Details</h2>

<p>
	<strong>Claim:</strong>
	{#if has_associated_assumptions}
		Given a {remove_underscores(type)}
		{#each Object.entries(implication.associated_assumptions) as [label, set], ind}
			{#if set}
				whose
				{remove_underscores(label)}
				{#each set as property, index}
					{property_relation_dict[associated_types[label]][property]}
					<a href={get_property_url(property, associated_types[label])}
						>{property}</a
					>{#if index < set.size - 1}
						&nbsp;and&nbsp;
					{/if}
				{/each}{#if ind < Object.entries(implication.associated_assumptions).length - 1}
					, and&nbsp;
				{/if}
			{/if}
		{/each},
		{#if implication.is_equivalence}
			it
		{:else if implication.assumptions.length > 0}
			if it
		{/if}
	{:else if implication.is_equivalence}
		A {remove_underscores(type)}
	{:else}
		If a {remove_underscores(type)}
	{/if}
	{#each implication.assumptions as property, index}
		{property_relation_dict[type][property]}
		<a href={get_property_url(property, type)}>{property}</a
		>{#if index < implication.assumptions.length - 1}
			&nbsp;and&nbsp;
		{/if}
	{/each}{#if implication.is_equivalence}
		&nbsp;if and only if it
	{:else}
		{#if implication.assumptions.length},{/if} then it
	{/if}
	{#each implication.conclusions as property, index}
		{property_relation_dict[type][property]}
		<a href={get_property_url(property, type)}>{property}</a
		>{#if index < implication.conclusions.length - 1}
			&nbsp;and&nbsp;
		{:else}.
		{/if}
	{/each}
</p>

<p>
	<strong>Proof:</strong>
	{@html implication.proof}
</p>

{#if structures.length > 0}
	<details>
		<summary class="hint">
			{pluralize(structures.length, {
				one: `Show {count} ${remove_underscores(type)} using this implication`,
				other: `Show {count} ${PLURALS[type]} using this implication`
			})}
		</summary>
		<StructureList {structures} {type} />
	</details>
{/if}

<button class="button" onclick={() => window.history.back()}>Go back</button>

<SuggestionForm />
