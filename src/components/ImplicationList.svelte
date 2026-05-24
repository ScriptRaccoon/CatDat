<script lang="ts">
	import type { ImplicationDisplay, StructureType } from '$lib/commons/types'
	import ImplicationItem from './ImplicationItem.svelte'

	type Props = {
		implications: ImplicationDisplay[]
		highlighted_property?: string
		type: StructureType
	}

	let { implications, highlighted_property, type }: Props = $props()
</script>

{#if implications.length}
	<ul>
		{#each implications as implication}
			<li>
				<ImplicationItem {implication} {highlighted_property} {type} />
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}
