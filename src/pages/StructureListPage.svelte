<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { normalize_text, pluralize } from '$lib/client/utils'
	import StructureList from '$components/StructureList.svelte'
	import type { StructureShort, StructureType } from '$lib/commons/types'
	import { PLURALS } from '$lib/commons/structures'
	import TagList from '$components/TagList.svelte'
	import Fa from 'svelte-fa'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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
					normalize_text(s.name).includes(normalize_text(search))
				)
			: structures
	)
</script>

<MetaData title="List of {PLURALS[type]}" />

<section>
	<h2>List of {PLURALS[type]}</h2>

	{#if type === 'functor'}
		<!-- TODO: remove this later -->
		<p>
			<Fa icon={faInfoCircle} />
			The functor application is still in its early stages. More functors will be added
			soon.
		</p>
	{/if}

	{#if type === 'morphism'}
		<!-- TODO: remove this later -->
		<p>
			<Fa icon={faInfoCircle} />
			The morphism application is still in its early stages. More morphisms will be added
			soon.
		</p>
	{/if}

	<SearchFilter bind:search />

	<p class="hint">
		{pluralize(searched_structures.length, {
			one: `Found {count} ${type}`,
			other: `Found {count} ${PLURALS[type]}`
		})}
	</p>

	<StructureList structures={searched_structures} {type} />
</section>

<section>
	<h2>Tags</h2>

	<TagList {tags} {type} sort="structure" />
</section>

<SuggestionForm />

<style>
	section + section {
		margin-top: 2rem;
	}
</style>
