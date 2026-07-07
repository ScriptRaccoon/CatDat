<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { capitalize, pluralize } from '$shared/utils'
	import type { StructureShort, StructureType } from '$lib/commons/types'
	import { PLURALS } from '$shared/config'

	type Props = {
		type: StructureType
		structures: StructureShort[]
		tag: string
	}

	let { type, structures, tag }: Props = $props()
</script>

<MetaData title="{capitalize(PLURALS[type])} tagged with '{tag}'" />

<h2>{capitalize(PLURALS[type])} tagged with '{tag}'</h2>

<p class="hint">
	{pluralize(structures.length, {
		one: `Found {count} ${type}`,
		other: `Found {count} ${PLURALS[type]}`
	})}
</p>

<StructureList {structures} {type} />
