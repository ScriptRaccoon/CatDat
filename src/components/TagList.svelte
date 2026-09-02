<script lang="ts">
	import type { StructureType } from '$lib/commons/types'
	import Fa from 'svelte-fa'
	import Chip from './Chip.svelte'
	import ChipGroup from './ChipGroup.svelte'
	import { faTag } from '@fortawesome/free-solid-svg-icons'

	type Props = {
		type: StructureType
		tags: string[]
		sort: 'structure' | 'property'
	}

	let { type, tags, sort }: Props = $props()
</script>

<ChipGroup>
	{#each tags as tag}
		<Chip
			size="small"
			link={sort === 'structure'
				? `/${type}-list/${tag}`
				: `/${type}-properties/${tag}`}
		>
			<Fa icon={faTag} color="var(--secondary-text-color)" />
			&nbsp;{tag}
		</Chip>
	{/each}
</ChipGroup>
