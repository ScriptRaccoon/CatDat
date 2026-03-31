<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import { get_property_url } from '$lib/commons/property.url'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<MetaData title="Implication Details" />

<h2>Implication Details</h2>

<p>
	<strong>Assumptions:</strong>

	{#each data.implication.assumptions as property, index}
		<a href={get_property_url(property, 'functor')}>{property}</a
		>{#if index < data.implication.assumptions.length - 1}
			,&nbsp;
		{/if}
	{/each}
</p>

{#if data.implication.source_assumptions.length}
	<p>
		<strong>Assumptions on source category:</strong>

		{#each data.implication.source_assumptions as property, index}
			<a href={get_property_url(property, 'category')}>{property}</a
			>{#if index < data.implication.source_assumptions.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</p>
{/if}

{#if data.implication.target_assumptions.length}
	<p>
		<strong>Assumptions on target category:</strong>

		{#each data.implication.target_assumptions as property, index}
			<a href={get_property_url(property, 'category')}>{property}</a
			>{#if index < data.implication.target_assumptions.length - 1}
				,&nbsp;
			{/if}
		{/each}
	</p>
{/if}

<p>
	<strong>Conclusions:</strong>
	{#each data.implication.conclusions as property, index}
		<a href={get_property_url(property, 'functor')}>{property}</a
		>{#if index < data.implication.conclusions.length - 1}
			,&nbsp;
		{/if}
	{/each}
</p>

{#if data.implication.is_equivalence}
	<p>
		<Fa icon={faInfoCircle} />
		This is an equivalence.
	</p>
{/if}

{#if data.implication.dualized_from}
	<p>
		This implication has been dualized from <a
			href="/functor-implication/{data.implication.dualized_from}"
		>
			this implication
		</a>.
	</p>
{:else}
	<p>
		<strong>Reason:</strong>
		{@html data.implication.reason}
	</p>
{/if}

<button class="button" onclick={() => window.history.back()}>Go back</button>
