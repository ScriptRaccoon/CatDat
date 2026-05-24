<script lang="ts">
	import type { CommentObject } from '$lib/commons/types'

	type Props = {
		comments: CommentObject[]
	}

	let { comments }: Props = $props()
</script>

{#if comments.length}
	<section>
		<h3>Comments</h3>

		<ul>
			{#each comments as { id, comment } (id)}
				<li class="hint">{@html comment}</li>
			{/each}
		</ul>
	</section>
{/if}
