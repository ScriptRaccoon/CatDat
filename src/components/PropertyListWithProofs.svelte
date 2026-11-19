<script lang="ts">
	import {
		encode_property_ID,
		get_property_label,
		get_property_url
	} from '#shared/property.utils.ts'
	import type { PropertyShort, StructureType } from '#lib/commons/types.ts'
	import TextWithProof from './TextWithProof.svelte'

	type Props = {
		properties: (PropertyShort & { proof: string })[]
		type: StructureType
		label: string
	}

	let { properties, type, label }: Props = $props()
</script>

{#if properties.length}
	<ul class="no-bullets with-margins" aria-label={label}>
		{#each properties as { id, relation, proof }}
			<li>
				<TextWithProof {proof} proof_key={encode_property_ID(id)}>
					{relation}
					<a href={get_property_url(id, type)}>{get_property_label(id)}</a>
				</TextWithProof>
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}
