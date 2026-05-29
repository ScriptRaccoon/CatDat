<script lang="ts">
	import { get_property_url } from '$lib/commons/property.url'
	import type { StructureType } from '$lib/commons/types'
	import TextWithProof from './TextWithProof.svelte'

	type Props = {
		properties: {
			id: string
			label?: string
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
		{#each properties as { id, label, relation, proof }}
			<li>
				<TextWithProof {proof}>
					{relation}
					<a href={get_property_url(id, type)}>{label || id}</a>
				</TextWithProof>
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}
