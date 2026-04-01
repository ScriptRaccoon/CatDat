<script lang="ts">
	import type { CategoryShort } from '$lib/commons/types'

	type Props = {
		categories: (CategoryShort & { count?: number })[]
	}

	let { categories }: Props = $props()
</script>

{#if categories.length}
	<ul>
		{#each categories as item}
			<li>
				<a href="/category/{item.id}">
					{item.name}
				</a>
				{#if item.count !== undefined}
					<span class="count">({item.count})</span>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}

<style>
	ul {
		margin-block: 1rem;
	}

	.count {
		color: var(--secondary-text-color);
	}
</style>
