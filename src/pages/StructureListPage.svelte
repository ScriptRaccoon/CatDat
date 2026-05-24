<script lang="ts">
	import Chip from '$components/Chip.svelte'
	import ChipGroup from '$components/ChipGroup.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { normalize_text, pluralize } from '$lib/client/utils'
	import StructureList from '$components/StructureList.svelte'
	import type { StructureShort, StructureType } from '$lib/commons/types'
	import { goto } from '$app/navigation'
	import { PLURALS } from '$lib/commons/structures'

	type Props = {
		type: StructureType
		structures: StructureShort[]
		tags: string[]
	}

	let { type, structures, tags }: Props = $props()

	let search = $state('')

	let searched_structures = $derived(
		search
			? structures.filter((s) =>
					normalize_text(s.name).includes(normalize_text(search)),
				)
			: structures,
	)

	function filter_by_tag(tag: string) {
		goto(`/${PLURALS[type]}/${tag}`)
	}
</script>

<MetaData title="List of {PLURALS[type]}" />

<section>
	<h2>List of {PLURALS[type]}</h2>

	<SearchFilter bind:search />

	<p class="hint">
		{pluralize(searched_structures.length, {
			one: `Found {count} ${type}`,
			other: `Found {count} ${PLURALS[type]}`,
		})}
	</p>

	<StructureList structures={searched_structures} {type} />
</section>

<section>
	<h2>List of tags</h2>

	<ChipGroup>
		{#each tags as tag}
			<Chip size="small" handle_click={() => filter_by_tag(tag)}>{tag}</Chip>
		{/each}
	</ChipGroup>
</section>

<SuggestionForm />

<style>
	section + section {
		margin-top: 2rem;
	}
</style>
