<script lang="ts">
	// TODO: remove code duplication with CategoryList component

	import type { FunctorShort } from '$lib/commons/types'

	type Props = {
		functors: (FunctorShort & { count?: number })[]
	}

	let { functors }: Props = $props()
</script>

{#if functors.length}
	<ul>
		{#each functors as functor}
			<li>
				<a href="/functor/{functor.id}">
					{functor.name}
				</a>
				{#if functor.count !== undefined}
					<span class="count">({functor.count})</span>
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
