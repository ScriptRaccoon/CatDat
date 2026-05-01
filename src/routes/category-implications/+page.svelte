<script lang="ts">
	import { browser } from '$app/environment'
	import ImplicationList from '$components/ImplicationList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { normalize_text, pluralize } from '$lib/client/utils'

	let { data } = $props()

	let show_deduced_implications = $state(false)

	function toggle() {
		show_deduced_implications = !show_deduced_implications
		if (browser) window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	let displayed_implications = $derived(
		show_deduced_implications
			? data.implications
			: data.implications.filter((implication) => !implication.is_deduced),
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

<MetaData title="Implications of categories" />

<h2>Implications of categories</h2>

<SearchFilter bind:search />

<p class="hint">
	{pluralize(filtered_implications.length, {
		one: 'Found {count} implication*',
		other: 'Found {count} implications*',
	})}
</p>

<ImplicationList implications={filtered_implications} />

<p class="hint">
	*Deductions from these implications are automatically incorporated into each category
	whenever applicable. For instance, if a category is identified as complete, the
	property of having a terminal object is automatically inferred and added.
</p>

<p class="hint">
	Implications can be combined to yield longer, non-obvious deductions that are not
	explicitly listed above. For example, the listed implications imply that every
	inhabited groupoid with binary products is trivial.
</p>

<p class="hint">
	Moreover, implications are automatically dualized when the corresponding dual
	properties exist. For example, the statement that finitely complete categories with
	cofiltered limits are complete automatically implies that finitely cocomplete
	categories with filtered colimits are cocomplete. Similarly, if a category is
	self-dual and, for example, complete, it is automatically inferred to be cocomplete as
	well.
</p>

<button class="button" onclick={toggle}>
	{#if show_deduced_implications}
		Hide deduced implications
	{:else}
		Show deduced implications
	{/if}
</button>

<SuggestionForm />
