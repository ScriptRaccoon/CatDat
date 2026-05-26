<script lang="ts">
	import type { StructureShort, StructureType } from '$lib/commons/types'

	type Props = {
		structures: (StructureShort & { count?: number })[]
		type: StructureType
	}

	let { structures, type }: Props = $props()
</script>

{#if structures.length}
	<ul class="with-margins">
		{#each structures as structure}
			<li>
				<a href="/{type}/{structure.id}">
					{structure.name}
				</a>
				{#if structure.count !== undefined}
					<span class="count">({structure.count})</span>
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
