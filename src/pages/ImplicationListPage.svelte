<script lang="ts">
	import HelpMessage from '#components/HelpMessage.svelte'
	import ImplicationList from '#components/ImplicationList.svelte'
	import UndecidableImplicationList from '#components/UndecidableImplicationList.svelte'
	import MetaData from '#components/MetaData.svelte'
	import SearchFilter from '#components/SearchFilter.svelte'
	import SuggestionForm from '#components/SuggestionForm.svelte'
	import {
		capitalize,
		normalize_text,
		pluralize,
		remove_underscores
	} from '#shared/utils.ts'
	import type {
		ImplicationDisplay,
		StructureType,
		UndecidableImplication
	} from '#lib/commons/types.ts'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import type { Snippet } from 'svelte'
	import Fa from 'svelte-fa'

	type Props = {
		implications: ImplicationDisplay[]
		undecidable_implications: UndecidableImplication[]
		type: StructureType
		hints: Snippet
	}

	let { implications, undecidable_implications, type, hints }: Props = $props()

	let show_deduced_implications = $state(false)

	function toggle() {
		show_deduced_implications = !show_deduced_implications
	}

	let displayed_implications = $derived(
		show_deduced_implications
			? implications
			: implications.filter((implication) => !implication.is_deduced)
	)

	let search = $state('')

	let filtered_implications = $derived(
		search
			? displayed_implications.filter((implication) =>
					[...implication.assumptions, ...implication.conclusions].some(
						(prop) => normalize_text(prop).includes(normalize_text(search))
					)
				)
			: displayed_implications
	)

	let deduced_implications_count = $derived(
		implications.filter((implication) => implication.is_deduced).length
	)

	let deduced_note = $derived(
		search || show_deduced_implications
			? ''
			: `plus ${deduced_implications_count} deduced, `
	)

	let toggle_label = $derived(
		show_deduced_implications
			? 'Hide deduced implications'
			: 'Show deduced implications'
	)

	let toggle_text = $derived(
		show_deduced_implications ? 'hide deduced' : search ? 'show deduced' : 'show them'
	)
</script>

<MetaData title="{capitalize(remove_underscores(type))} implications" />

<h1>{capitalize(remove_underscores(type))} implications</h1>

<details>
	<summary class="hint">How are implications used?</summary>
	{@render hints()}
</details>

<SearchFilter bind:search />

<p class="hint">
	{pluralize(filtered_implications.length, {
		one: 'Found {count} implication',
		other: 'Found {count} implications'
	})}
	({deduced_note}<button class="toggle-btn" onclick={toggle} aria-label={toggle_label}
		>{toggle_text}</button
	>)
</p>

<HelpMessage id="implication-link">
	New here? Click any <Fa icon={faInfoCircle} /> icon to view the proof for that implication.
</HelpMessage>

<ImplicationList implications={filtered_implications} {type} />

{#if undecidable_implications.length}
	<h2>Undecidable implications</h2>

	<p class="hint">
		It is undecidable in ZFC whether these implications hold. They are not used for
		deductions.
	</p>

	<UndecidableImplicationList implications={undecidable_implications} {type} />
{/if}

<SuggestionForm />

<style>
	.toggle-btn {
		text-decoration: underline;
	}
</style>
