<script lang="ts">
	import { goto } from '$app/navigation'
	import { navigating } from '$app/state'
	import MetaData from '$components/MetaData.svelte'
	import Selection from '$components/Selection.svelte'
	import {
		get_compared_structures,
		MAX_STRUCTURES_COMPARE,
		save_comparison,
	} from '$lib/commons/compare.utils'
	import { PLURALS } from '$lib/commons/structures'
	import type { StructureShort, StructureType } from '$lib/commons/types'

	type Props = {
		type: StructureType
		structures: StructureShort[]
	}

	let { type, structures }: Props = $props()

	// svelte-ignore state_referenced_locally
	let compared_structures: string[] = $state(get_compared_structures(type))

	$effect(() => {
		save_comparison(type, compared_structures)
	})

	let chosen_structures: StructureShort[] = $derived(
		compared_structures
			.map((name) => structures.find((s) => s.name === name))
			.filter((s) => s !== undefined),
	)

	let is_valid_comparison = $derived(
		chosen_structures.length > 0 &&
			chosen_structures.length <= MAX_STRUCTURES_COMPARE,
	)

	function compare_structures() {
		if (!is_valid_comparison) return
		const path = chosen_structures.map((s) => s.id).join('/')
		goto(`/${type}-comparison/${path}`)
	}

	let is_comparing = $derived(
		navigating.to?.route.id?.startsWith(`/${type}-comparison`),
	)
</script>

<MetaData
	title="Compare {PLURALS[type]}"
	description="Compare {PLURALS[type]} based on their properties"
/>

<h2>Compare {PLURALS[type]}</h2>

<p class="hint">
	Select up to {MAX_STRUCTURES_COMPARE}
	{PLURALS[type]} to compare their properties with each other.
	{#if compared_structures.length === MAX_STRUCTURES_COMPARE}
		The maximum is reached.
	{/if}
</p>

<Selection
	allowed_items={structures.map((s) => s.name)}
	section_label="selected {PLURALS[type]}"
	item_label={type}
	bind:selected_items={compared_structures}
	max={MAX_STRUCTURES_COMPARE}
/>

<p>
	<button
		class="button"
		onclick={compare_structures}
		disabled={!is_valid_comparison || is_comparing}
	>
		{#if is_comparing}
			Comparing...
		{:else}
			Compare
		{/if}
	</button>
</p>
