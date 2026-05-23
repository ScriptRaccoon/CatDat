<script lang="ts">
	import {
		faArrowRight,
		faArrowsLeftRight,
		faInfoCircle,
		faPlus,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { get_property_url } from '$lib/commons/property.url'
	import type { ImplicationDisplay, StructureType } from '$lib/commons/types'

	type Props = {
		implication: ImplicationDisplay
		highlighted_property?: string
		type: StructureType
	}

	let { implication, highlighted_property, type }: Props = $props()
</script>

<a href="/{type}-implication/{implication.id}" aria-label="details">
	<Fa icon={faInfoCircle} color="var(--secondary-text-color)" />
</a>

{#each implication.assumptions as assumption, i}
	<a
		class="property"
		href={get_property_url(assumption, type)}
		class:highlighted={assumption === highlighted_property}>{assumption}</a
	>
	{#if i < implication.assumptions.length - 1}
		<Fa icon={faPlus} class="operator" />
		<span class="visually-hidden">and</span>
	{/if}
{/each}

<span aria-hidden="true">
	{#if implication.is_equivalence}
		<Fa icon={faArrowsLeftRight} class="operator" />
	{:else}
		<Fa icon={faArrowRight} class="operator" />
	{/if}
</span>

<span class="visually-hidden">
	{#if implication.is_equivalence}
		is equivalent to
	{:else}
		implies
	{/if}
</span>

{#each implication.conclusions as conclusion, i}
	<a
		class="property"
		href={get_property_url(conclusion, type)}
		class:highlighted={conclusion === highlighted_property}>{conclusion}</a
	>
	{#if i < implication.conclusions.length - 1}
		<Fa icon={faPlus} class="operator" />
		<span class="visually-hidden">and</span>
	{/if}
{/each}

{#if implication.source_assumptions?.length || implication.target_assumptions?.length}
	<span class="footnote">*</span>
{/if}

<style>
	.property:not(.highlighted) {
		text-decoration: none;
	}

	.property.highlighted {
		text-decoration-style: dashed;
		text-underline-offset: 4px;
	}

	:global(.operator) {
		margin-inline: 0.25rem;
		color: var(--secondary-text-color);
	}

	.footnote {
		color: var(--accent-color);
	}
</style>
