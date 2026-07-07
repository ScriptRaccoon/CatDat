<script lang="ts">
	import type { StructureShort, StructureType } from '$lib/commons/types'
	import { PLURALS } from '$shared/config'
	import StructureList from './StructureList.svelte'

	type Props = {
		type: StructureType
		structures: StructureShort[]
		name: string
	}

	let { type, structures, name }: Props = $props()
</script>

{#if structures.length}
	<section>
		<h3>Undistinguishable {PLURALS[type]}</h3>

		<p class="hint">
			These {PLURALS[type]} in the database currently have exactly the same properties
			as the {name}. This indicates that the data may be incomplete or that a
			distinguishing property may be missing from the database.
		</p>

		<StructureList {structures} {type} />
	</section>
{/if}
