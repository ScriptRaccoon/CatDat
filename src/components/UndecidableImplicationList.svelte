<script lang="ts">
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { get_property_url } from '#shared/property.utils.ts'
	import type { StructureType, UndecidableImplication } from '#lib/commons/types.ts'
	import TextWithProof from './TextWithProof.svelte'

	// not ImplicationItem: there is no detail page, so the proof is shown in a popup

	type Props = {
		implications: UndecidableImplication[]
		highlighted_property?: string
		type: StructureType
	}

	let { implications, highlighted_property, type }: Props = $props()
</script>

<ul class="no-bullets with-margins" aria-label="Undecidable implications">
	{#each implications as { id, assumption, conclusion, proof }}
		<li>
			<TextWithProof
				claim={`The implication "${assumption} ⟹ ${conclusion}" is undecidable in ZFC`}
				{proof}
				proof_key={id}
			>
				<a
					class="implication-property"
					href={get_property_url(assumption, type)}
					class:highlighted={assumption === highlighted_property}
				>
					{assumption}
				</a>

				<span aria-hidden="true" class="implication-operator">
					<Fa icon={faArrowRight} />
				</span>

				<span class="visually-hidden">implies</span>

				<a
					class="implication-property"
					href={get_property_url(conclusion, type)}
					class:highlighted={conclusion === highlighted_property}
				>
					{conclusion}
				</a>
			</TextWithProof>
		</li>
	{/each}
</ul>
