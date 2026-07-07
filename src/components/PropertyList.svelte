<script lang="ts">
	import { get_property_label, get_property_url } from '$shared/property.utils'
	import type { StructureType } from '$lib/commons/types'
	import TextWithProof from './TextWithProof.svelte'

	type Props = {
		properties: {
			id: string
			relation: string
			proof?: string | null
		}[]
		type: StructureType
		no_bullets?: boolean
	}

	let { properties, type, no_bullets = false }: Props = $props()
</script>

{#if properties.length}
	<ul class:no-bullets={no_bullets} class="with-margins">
		{#each properties as { id, relation, proof }}
			<li>
				<TextWithProof {proof}>
					{relation}
					<a href={get_property_url(id, type)}>{get_property_label(id)}</a>
				</TextWithProof>
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}
