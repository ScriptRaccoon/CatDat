<script lang="ts">
	import type { StructureShort, StructureType } from '#lib/commons/types.ts'

	type Props = {
		structures: (StructureShort & { count?: number })[]
		type: StructureType
		label?: string
	}

	let { structures, type, label }: Props = $props()
</script>

{#if structures.length}
	<ul class="with-margins" aria-label={label}>
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
