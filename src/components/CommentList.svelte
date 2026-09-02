<script lang="ts">
	import type { CommentObject } from '$lib/commons/types'

	type Props = {
		comments: CommentObject[]
	}

	let { comments }: Props = $props()
</script>

{#if comments.length}
	<section>
		<h2>Comments</h2>

		<ul class="with-margins">
			{#each comments as { id, comment } (id)}
				<li class="hint">{@html comment}</li>
			{/each}
		</ul>
	</section>
{/if}
