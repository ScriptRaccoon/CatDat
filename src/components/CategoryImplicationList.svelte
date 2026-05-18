<script lang="ts">
	import type { ImplicationDisplay } from '$lib/commons/types'
	import CategoryImplicationItem from './CategoryImplicationItem.svelte'

	type Props = {
		implications: ImplicationDisplay[]
		highlighted_property?: string
	}

	let { implications, highlighted_property }: Props = $props()
</script>

{#if implications.length}
	<ul>
		{#each implications as implication}
			<li>
				<CategoryImplicationItem {implication} {highlighted_property} />
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}
