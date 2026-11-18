<script lang="ts">
	import SearchFilter from './SearchFilter.svelte'
	import type { StructureShort, StructureType } from '#lib/commons/types.ts'
	import { search_structures, to_structure_lookup_item } from '#lib/client/utils.ts'
	import { capitalize, pluralize, remove_underscores } from '#shared/utils.ts'
	import { PLURALS } from '#shared/config.ts'

	type Props = {
		type: StructureType
		examples: StructureShort[]
		counterexamples: StructureShort[]
		undecidable_structures: StructureShort[]
		unknown_structures: StructureShort[]
		keywords: Record<string, string[]>
	}

	let {
		type,
		examples,
		counterexamples,
		undecidable_structures,
		unknown_structures,
		keywords
	}: Props = $props()

	let items = $derived(
		[
			...examples.map((s) => to_structure_lookup_item(s, 'satisfied')),
			...counterexamples.map((s) => to_structure_lookup_item(s, 'unsatisfied')),
			...undecidable_structures.map((s) =>
				to_structure_lookup_item(s, 'undecidable')
			),
			...unknown_structures.map((s) => to_structure_lookup_item(s, 'unknown'))
		].sort((a, b) => a.name.localeCompare(b.name))
	)

	let search = $state('')

	let results = $derived(search ? search_structures(items, search, keywords) : [])

	let type_label = $derived(remove_underscores(type))
</script>

<section aria-label="{type_label} lookup" class="lookup" class:empty={!search}>
	<SearchFilter
		bind:search
		label="look up a {type_label}"
		placeholder="Look up a {type_label}..."
		full_width={true}
	/>

	{#if search}
		<p class="hint">
			{#if results.length}
				{pluralize(results.length, {
					one: `Found {count} ${type_label}`,
					other: `Found {count} ${PLURALS[type]}`
				})}
			{:else}
				No {type_label} matches
			{/if}
		</p>

		{#if results.length}
			<ul class="with-margins" aria-label="{capitalize(type_label)} lookup results">
				{#each results as { id, name, status } (id)}
					<li>
						<a href="/{type}/{id}">{name}</a>
						<span class="status">({status})</span>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</section>

<style>
	.lookup {
		margin-top: 2rem;
	}

	.lookup.empty {
		/* cancels the top margin of the sticky heading below */
		margin-bottom: -1rem;
	}

	.status {
		color: var(--secondary-text-color);
	}
</style>
