<script lang="ts">
	import type { StructureShortDictionary } from '#lib/commons/types.ts'
	import { PLURALS, STRUCTURE_TYPES } from '#shared/config.ts'
	import { capitalize, pluralize, remove_underscores } from '#shared/utils.ts'
	import StructureList from './StructureList.svelte'

	type Props = {
		structures_based_on: StructureShortDictionary
		structure_name: string
	}

	let { structures_based_on, structure_name }: Props = $props()
</script>

{#each STRUCTURE_TYPES as type}
	{@const structures = structures_based_on[type]}
	{#if structures && structures.length > 0}
		<h2>{capitalize(PLURALS[type])}</h2>

		<p class="hint">
			The database stores {structures.length}
			{pluralize(structures.length, {
				one: remove_underscores(type),
				other: PLURALS[type]
			})}
			based on the {structure_name}.
		</p>

		<StructureList {structures} {type} />
	{/if}
{/each}
