<script lang="ts">
	import {
		faArrowRight,
		faArrowsLeftRight,
		faInfoCircle,
		faPlus
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { get_property_url } from '$lib/commons/property.utils'
	import type { ImplicationDisplay, StructureType } from '$lib/commons/types'

	type Props = {
		type: StructureType
		implication: ImplicationDisplay
		highlighted_property?: string
	}

	let { type, implication, highlighted_property }: Props = $props()

	let has_additional_assumptions = $derived(
		Object.values(implication.mapped_assumptions).some((list) => list?.length)
	)
</script>

<div class="implication-container">
	<a href="/{type}-implication/{implication.id}" aria-label="details">
		<Fa icon={faInfoCircle} color="var(--secondary-text-color)" />
	</a>

	<div>
		{#each implication.assumptions as assumption, i}
			<a
				class="property"
				href={get_property_url(assumption, type)}
				class:highlighted={assumption === highlighted_property}
			>
				{assumption}
			</a>

			{#if i < implication.assumptions.length - 1}
				<span class="operator">
					<Fa icon={faPlus} class="operator" />
					<span class="visually-hidden">and</span>
				</span>
			{/if}
		{/each}

		<span aria-hidden="true" class="operator">
			{#if has_additional_assumptions}
				<span class="bracket">(</span>
			{/if}<Fa
				icon={implication.is_equivalence ? faArrowsLeftRight : faArrowRight}
			/>{#if has_additional_assumptions}
				<span class="bracket">)</span>
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
				class:highlighted={conclusion === highlighted_property}
			>
				{conclusion}
			</a>

			{#if i < implication.conclusions.length - 1}
				<span class="operator">
					<Fa icon={faPlus} />
					<span class="visually-hidden">and</span>
				</span>
			{/if}
		{/each}
	</div>
</div>

<style>
	.implication-container {
		display: inline-flex;
		gap: 0.5rem;
	}

	.property:not(.highlighted) {
		text-decoration: none;
	}

	.property.highlighted {
		text-decoration-style: dashed;
		text-underline-offset: 4px;
	}

	.operator {
		margin-inline: 0.25rem;
		color: var(--secondary-text-color);
	}

	.bracket {
		color: var(--secondary-text-color);
	}
</style>
