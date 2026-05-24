<script lang="ts">
	import { browser } from '$app/environment'
	import HelpMessage from '$components/HelpMessage.svelte'
	import ImplicationList from '$components/ImplicationList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { normalize_text, pluralize } from '$lib/client/utils'
	import { PLURALS } from '$lib/commons/structures'
	import type { ImplicationDisplay, StructureType } from '$lib/commons/types'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import type { Snippet } from 'svelte'
	import Fa from 'svelte-fa'

	type Props = {
		implications: ImplicationDisplay[]
		type: StructureType
		hints?: Snippet
	}

	let { implications, type, hints }: Props = $props()

	let show_deduced_implications = $state(false)

	function toggle() {
		show_deduced_implications = !show_deduced_implications
		if (browser) window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	let displayed_implications = $derived(
		show_deduced_implications
			? implications
			: implications.filter((implication) => !implication.is_deduced),
	)

	let search = $state('')

	let filtered_implications = $derived(
		search
			? displayed_implications.filter((implication) =>
					[...implication.assumptions, ...implication.conclusions].some(
						(prop) => normalize_text(prop).includes(normalize_text(search)),
					),
				)
			: displayed_implications,
	)
</script>

<MetaData title="Implications of {PLURALS[type]}" />

<h2>Implications of {PLURALS[type]}</h2>

<SearchFilter bind:search />

<p class="hint">
	{pluralize(filtered_implications.length, {
		one: 'Found {count} implication*',
		other: 'Found {count} implications*',
	})}
</p>

<HelpMessage id="implication-link">
	New here? Click any <Fa icon={faInfoCircle} /> icon to view the proof for that implication.
</HelpMessage>

<ImplicationList implications={filtered_implications} {type} />

{#if hints}
	{@render hints()}
{/if}

<button class="button" onclick={toggle}>
	{#if show_deduced_implications}
		Hide deduced implications
	{:else}
		Show deduced implications
	{/if}
</button>

<SuggestionForm />
