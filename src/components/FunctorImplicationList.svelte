<script lang="ts">
	// TODO: remove code duplication with category implication list

	import type { FunctorImplicationDisplay } from '$lib/commons/types'
	import FunctorImplicationItem from './FunctorImplicationItem.svelte'

	type Props = {
		implications: FunctorImplicationDisplay[]
		highlighted_property?: string
	}

	let { implications, highlighted_property }: Props = $props()
</script>

{#if implications.length}
	<ul>
		{#each implications as implication}
			<li>
				<FunctorImplicationItem {implication} {highlighted_property} />
			</li>
		{/each}
	</ul>

	<p class="hint">
		*Those implications also require assumptions on the source or target category.
	</p>
{:else}
	<p>&mdash;</p>
{/if}
