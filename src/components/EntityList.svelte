<script lang="ts">
	import type { EntityShort } from '$lib/commons/types'

	type Props = {
		entities: (EntityShort & { count?: number })[]
		type: 'category' | 'functor'
	}

	let { entities, type }: Props = $props()
</script>

{#if entities.length}
	<ul>
		{#each entities as entity}
			<li>
				<a href="/{type}/{entity.id}">
					{entity.name}
				</a>
				{#if entity.count !== undefined}
					<span class="count">({entity.count})</span>
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
