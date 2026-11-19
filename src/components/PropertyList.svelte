<script lang="ts">
	import { get_property_label, get_property_url } from '#shared/property.utils.ts'
	import type { PropertyShort, StructureType } from '#lib/commons/types.ts'

	type Props = {
		properties: PropertyShort[]
		type: StructureType
		label?: string
	}

	let { properties, type, label }: Props = $props()
</script>

{#if properties.length}
	<ul class="with-margins" aria-label={label}>
		{#each properties as { id, relation }}
			<li>
				{relation}
				<a href={get_property_url(id, type)}>{get_property_label(id)}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}
