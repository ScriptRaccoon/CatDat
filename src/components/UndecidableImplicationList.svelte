<script lang="ts">
	import { get_operator_html } from '#lib/commons/implication.utils.ts'
	import type { StructureType, UndecidableImplication } from '#lib/commons/types.ts'
	import ImplicationFormula from './ImplicationFormula.svelte'
	import TextWithProof from './TextWithProof.svelte'

	// not ImplicationList: there is no detail page, so the proof is shown in a popup

	type Props = {
		implications: UndecidableImplication[]
		highlighted_property?: string
		type: StructureType
	}

	let { implications, highlighted_property, type }: Props = $props()

	function get_claim(assumption: string, conclusion: string) {
		const implication = `${assumption} ${get_operator_html('implies')} ${conclusion}`
		return `The implication "${implication}" is undecidable in ZFC`
	}
</script>

<ul class="no-bullets with-margins" aria-label="Undecidable implications">
	{#each implications as { id, assumption, conclusion, proof }}
		<li>
			<TextWithProof
				claim={get_claim(assumption, conclusion)}
				{proof}
				proof_key={id}
			>
				<ImplicationFormula
					{type}
					assumptions={[assumption]}
					conclusions={[conclusion]}
					{highlighted_property}
				/>
			</TextWithProof>
		</li>
	{/each}
</ul>
