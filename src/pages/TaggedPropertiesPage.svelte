<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import { pluralize } from '$lib/client/utils'
	import type { PropertyShort, StructureType } from '$lib/commons/types'
	import PropertyList from '$components/PropertyList.svelte'
	import { PLURALS } from '$lib/commons/structures'

	type Props = {
		type: StructureType
		properties: PropertyShort[]
		tag: string
	}

	let { type, properties, tag }: Props = $props()
</script>

<MetaData title="Properties of {PLURALS[type]} tagged with '{tag}'" />

<h2>Properties of {PLURALS[type]} tagged with '{tag}'</h2>

<p class="hint">
	{pluralize(properties.length, {
		one: `Found {count} property`,
		other: `Found {count} properties`,
	})}
</p>

<PropertyList {properties} {type} />
