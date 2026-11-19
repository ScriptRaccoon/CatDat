<script lang="ts">
	import MetaData from '#components/MetaData.svelte'
	import { get_property_url } from '#shared/property.utils.ts'
	import { PLURALS } from '#shared/config.ts'
	import type { ComparisonResult, StructureType } from '#lib/commons/types.ts'
	import {
		faCheck,
		faQuestion,
		faXmark,
		type IconDefinition
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = { type: StructureType } & ComparisonResult

	let { type, structures, comparison_table }: Props = $props()

	const icon_config: Record<string, IconDefinition> = {
		yes: faCheck,
		no: faXmark,
		unknown: faQuestion
	}

	function is_difference(values: string[]) {
		return values.includes('yes') && values.includes('no')
	}

	let differences = $derived(
		comparison_table.filter(([_, ...values]) => is_difference(values))
	)

	let show_only_differences = $state(false)

	let displayed_rows = $derived(show_only_differences ? differences : comparison_table)

	let paragraph_element = $state<HTMLElement | null>(null)
	let show_thead_outline = $state(false)

	$effect(() => {
		if (!paragraph_element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				show_thead_outline = entry.intersectionRatio == 0
			},
			{ threshold: [0] }
		)

		observer.observe(paragraph_element)
	})
</script>

<MetaData title="Comparison of {PLURALS[type]}" />

<h1>Comparison of {PLURALS[type]}</h1>

<p class="hint" bind:this={paragraph_element}>
	Selected:
	{structures.map((c) => c.name).join(', ')}.
	{#if structures.length > 1}
		They differ in {differences.length} of {comparison_table.length} properties.
	{/if}
</p>

<div class="actions">
	{#if structures.length > 1}
		<button
			class="button"
			onclick={() => (show_only_differences = !show_only_differences)}
		>
			{show_only_differences ? 'Show all properties' : 'Show only differences'}
		</button>
	{/if}
	<a class="button" href="/{type}-comparison">Choose different {PLURALS[type]}</a>
</div>

<table>
	<thead class:outlined={show_thead_outline}>
		<tr>
			<th>Property</th>
			{#each structures as structure}
				<th>
					<a href="/{type}/{structure.id}" aria-label={structure.name}>
						{@html structure.notation}
					</a>
				</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each displayed_rows as [property, ...values]}
			{@const is_different = new Set(values).size > 1}
			<tr class:highlight={is_different}>
				<td>
					<a href={get_property_url(property, type)}>{property}</a>
				</td>
				{#each structures as _, i}
					{@const value = values[i]}
					<td class={value} aria-label={value}>
						<Fa icon={icon_config[value]} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	thead {
		top: 0;
		position: sticky;
		background-color: var(--bg-color);
	}

	thead.outlined {
		box-shadow: 0px 10px 30px var(--shadow-color);
	}

	th:first-child {
		text-align: left;
	}

	th:not(:first-child) {
		text-align: center;
	}

	td,
	th {
		padding-inline: 0.5rem;
	}

	td {
		padding-block: 0.25rem;
	}

	th {
		padding-block: 0.5rem;
	}

	table a {
		text-decoration: none;
	}

	td:not(:first-child) {
		text-align: center;
	}

	td.yes {
		color: var(--success-color);
	}

	td.no {
		color: var(--error-color);
	}

	td.unknown {
		color: var(--secondary-text-color);
	}

	tr.highlight {
		background-color: var(--secondary-bg-color);
	}

	@media (max-width: 600px) {
		table {
			font-size: 0.875rem;
		}
	}
</style>
