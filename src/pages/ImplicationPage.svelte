<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize } from '$lib/client/utils'
	import { get_property_url } from '$lib/commons/property.utils'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import type {
		ImplicationDisplay,
		MappedTypes,
		StructureShort,
		StructureType
	} from '$lib/commons/types'
	import { PLURALS } from '$lib/commons/structures'

	type Props = {
		type: StructureType
		implication: ImplicationDisplay
		structures: StructureShort[]
		mapped_types: MappedTypes
	}

	let { type, implication, structures, mapped_types }: Props = $props()
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

{#each Object.entries(implication.mapped_assumptions) as [map, list]}
	{#if list?.length}
		<p>
			<strong>Requirements of the {map}:</strong>

			{#each list as property, index}
				<a href={get_property_url(property, mapped_types[map])}>{property}</a
				>{#if index < list.length - 1}
					,&nbsp;
				{/if}
			{/each}
		</p>
	{/if}
{/each}

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
		<strong>Proof:</strong>
		{@html implication.proof}
	</p>
{/if}

{#if structures.length > 0}
	<details>
		<summary class="hint">
			{pluralize(structures.length, {
				one: `Show {count} ${type} using this implication`,
				other: `Show {count} ${PLURALS[type]} using this implication`
			})}
		</summary>
		<StructureList {structures} {type} />
	</details>
{/if}

<button class="button" onclick={() => window.history.back()}>Go back</button>

<SuggestionForm />
