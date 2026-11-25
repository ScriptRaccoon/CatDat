<script lang="ts">
	import { get_operator_html } from '#lib/commons/operator.utils.ts'
	import type { StructureType } from '#lib/commons/types.ts'
	import { get_property_url } from '#shared/property.utils.ts'

	type Props = {
		type: StructureType
		assumptions: string[]
		conclusions: string[]
		is_equivalence?: boolean
		has_associated_assumptions?: boolean
		highlighted_property?: string
	}

	let {
		type,
		assumptions,
		conclusions,
		is_equivalence = false,
		has_associated_assumptions = false,
		highlighted_property
	}: Props = $props()

	let arrow = $derived(get_operator_html(is_equivalence ? 'equivalent' : 'implies'))
</script>

<span class="formula">
	{#each assumptions as assumption, i}
		<a
			href={get_property_url(assumption, type)}
			class:highlighted={assumption === highlighted_property}
			class:outset-inline={assumption === highlighted_property}
		>
			{assumption}
		</a>

		{#if i < assumptions.length - 1}
			{@html get_operator_html('and') + ' '}
		{/if}
	{/each}

	{@html has_associated_assumptions ? `(${arrow})` : arrow}

	{#each conclusions as conclusion, i}
		<a
			href={get_property_url(conclusion, type)}
			class:highlighted={conclusion === highlighted_property}
			class:outset-inline={conclusion === highlighted_property}
		>
			{conclusion}
		</a>

		{#if i < conclusions.length - 1}
			{@html get_operator_html('and') + ' '}
		{/if}
	{/each}
</span>

<style>
	.formula :global(.operator) {
		margin-inline: 0.25rem;
	}

	a {
		text-decoration: none;

		&.highlighted {
			background-color: var(--secondary-bg-color);
			border-radius: 0.25rem;
		}
	}
</style>
