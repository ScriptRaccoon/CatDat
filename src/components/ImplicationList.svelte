<script lang="ts">
	import type { ImplicationDisplay, StructureType } from '#lib/commons/types.ts'
	import ImplicationItem from './ImplicationItem.svelte'

	type Props = {
		implications: ImplicationDisplay[]
		highlighted_property?: string
		type: StructureType
		label?: string
	}

	let { implications, highlighted_property, type, label }: Props = $props()
</script>

{#if implications.length}
	<ul class="no-bullets with-margins" aria-label={label}>
		{#each implications as implication}
			<li>
				<ImplicationItem {implication} {highlighted_property} {type} />
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}
