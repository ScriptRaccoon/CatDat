<script lang="ts">
	import {
		faArrowRight,
		faArrowsLeftRight,
		faInfoCircle,
		faPlus,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { get_property_url } from '$lib/commons/property.url'
	import type { ImplicationDisplay } from '$lib/commons/types'

	type Props = { implication: ImplicationDisplay; highlighted_property?: string }

	let { implication, highlighted_property }: Props = $props()
</script>

<a href="/category-implication/{implication.id}" aria-label="details">
	<Fa icon={faInfoCircle} color="var(--secondary-text-color)" />
</a>

{#each implication.assumptions as assumption, i}
	<a
		class="property"
		href={get_property_url(assumption)}
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
		href={get_property_url(conclusion)}
		class:highlighted={conclusion === highlighted_property}>{conclusion}</a
	>
	{#if i < implication.conclusions.length - 1}
		<Fa icon={faPlus} class="operator" />
		<span class="visually-hidden">and</span>
	{/if}
{/each}

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
</style>
