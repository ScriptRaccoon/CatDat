<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize } from '$lib/client/utils'
	import { get_property_url } from '$lib/commons/property.url'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import type {
		ImplicationDisplay,
		StructureShort,
		StructureType,
	} from '$lib/commons/types'
	import { PLURALS } from '$lib/commons/structures'

	type Props = {
		implication: ImplicationDisplay
		structures: StructureShort[]
		type: StructureType
		associated_type?: StructureType
	}

	let { implication, structures, type, associated_type = type }: Props = $props()
</script>

<MetaData title="Implication Details" />

<h2>Implication Details</h2>

<p>
	<strong>Assumptions:</strong>

	{#each implication.assumptions as property, index}
		<a href={get_property_url(property, type)}>{property}</a
		>{#if index < implication.assumptions.length - 1}
			,&nbsp;
		{/if}
	{/each}
</p>

{#if implication.source_assumptions?.length}
	<p>
		<strong>Assumptions on source {associated_type}:</strong>

		{#each implication.source_assumptions as property, index}
			<a href={get_property_url(property, associated_type)}>{property}</a
			>{#if index < implication.source_assumptions.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</p>
{/if}

{#if implication.target_assumptions?.length}
	<p>
		<strong>Assumptions on target {associated_type}:</strong>

		{#each implication.target_assumptions as property, index}
			<a href={get_property_url(property, associated_type)}>{property}</a
			>{#if index < implication.target_assumptions.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</p>
{/if}

<p>
	<strong>Conclusions:</strong>
	{#each implication.conclusions as property, index}
		<a href={get_property_url(property, type)}>{property}</a
		>{#if index < implication.conclusions.length - 1}
			,&nbsp;
		{/if}
	{/each}
</p>

{#if implication.is_equivalence}
	<p>
		<Fa icon={faInfoCircle} />
		This is an equivalence.
	</p>
{/if}

{#if implication.dualized_from}
	<p>
		This implication has been dualized from <a
			href="/{type}-implication/{implication.dualized_from}"
		>
			this implication
		</a>.
	</p>
{:else}
	<p>
		<strong>Reason:</strong>
		{@html implication.reason}
	</p>
{/if}

{#if structures.length > 0}
	<details>
		<summary class="hint">
			{pluralize(structures.length, {
				one: `Show {count} ${type} using this implication`,
				other: `Show {count} ${PLURALS[type]} using this implication`,
			})}
		</summary>
		<StructureList {structures} {type} />
	</details>
{/if}

<button class="button" onclick={() => window.history.back()}>Go back</button>

<SuggestionForm />
