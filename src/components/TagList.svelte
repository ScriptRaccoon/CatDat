<script lang="ts">
	import { goto } from '$app/navigation'
	import { PLURALS } from '$lib/commons/structures'
	import type { StructureType } from '$lib/commons/types'
	import Chip from './Chip.svelte'
	import ChipGroup from './ChipGroup.svelte'

	type Props = {
		type: StructureType
		tags: string[]
	}

	let { type, tags }: Props = $props()

	function filter_by_tag(tag: string) {
		goto(`/${PLURALS[type]}/${tag}`)
	}
</script>

<ChipGroup>
	{#each tags as tag}
		<Chip size="small" handle_click={() => filter_by_tag(tag)}>{tag}</Chip>
	{/each}
</ChipGroup>
