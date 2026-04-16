<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import { get_property_url } from '$lib/commons/property.url'
	import {
		faCheck,
		faQuestion,
		faXmark,
		type IconDefinition,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()

	let compared_categories = $derived(data.categories)
	let comparison_table = $derived(data.comparison_table)

	const icon_config: Record<string, IconDefinition> = {
		yes: faCheck,
		no: faXmark,
		unknown: faQuestion,
	}

	let paragraph_element = $state<HTMLElement | null>(null)
	let show_thead_outline = $state(false)

	$effect(() => {
		if (!paragraph_element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				show_thead_outline = entry.intersectionRatio == 0
			},
			{ threshold: [0] },
		)

		observer.observe(paragraph_element)
	})
</script>

<MetaData title="Comparison of categories" />

<h2>Comparison of categories</h2>

<p class="hint" bind:this={paragraph_element}>
	Selected:
	{compared_categories.map((c) => c.name).join(', ')}.
	<a href="/category-comparison">Choose different categories</a>.
</p>

<table>
	<thead class:outlined={show_thead_outline}>
		<tr>
			<th>Property</th>
			{#each compared_categories as category}
				<th>
					<a href="/category/{category.id}" aria-label={category.name}>
						{@html category.notation}
					</a>
				</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each comparison_table as [property, ...values]}
			{@const is_different = new Set(values).size > 1}
			<tr class:highlight={is_different}>
				<td>
					<a href={get_property_url(property)}>{property}</a>
				</td>
				{#each compared_categories as _, i}
					{@const value = values[i]}
					<td
						class={value}
						aria-label={value === null ? 'Unknown' : value ? 'Yes' : 'No'}
					>
						<Fa icon={icon_config[value]} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
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
