<script lang="ts">
	import { goto } from '$app/navigation'
	import type { StructureType } from '$lib/commons/types'
	import Chip from './Chip.svelte'
	import ChipGroup from './ChipGroup.svelte'

	type Props = {
		type: StructureType
		tags: string[]
		sort: 'structure' | 'property'
	}

	let { type, tags, sort }: Props = $props()

	function filter_by_tag(tag: string) {
		if (sort === 'structure') {
			goto(`/${type}-list/${tag}`)
		} else {
			goto(`/${type}-properties/${tag}`)
		}
	}
</script>

<ChipGroup>
	{#each tags as tag}
		<Chip size="small" handle_click={() => filter_by_tag(tag)}>{tag}</Chip>
	{/each}
</ChipGroup>
