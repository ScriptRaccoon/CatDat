<script lang="ts">
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import type { ImplicationShort, StructureType } from '#lib/commons/types.ts'
	import ImplicationFormula from './ImplicationFormula.svelte'

	type Props = {
		implications: ImplicationShort[]
		highlighted_property?: string
		type: StructureType
		label?: string
	}

	let { implications, highlighted_property, type, label }: Props = $props()

	function has_associated_assumptions(implication: ImplicationShort) {
		return Object.values(implication.associated_assumptions).some((set) => set?.size)
	}
</script>

{#if implications.length}
	<ul class="no-bullets with-margins" aria-label={label}>
		{#each implications as implication}
			<li>
				<div class="implication-container">
					<a href="/{type}-implication/{implication.id}" aria-label="details">
						<Fa icon={faInfoCircle} color="var(--secondary-text-color)" />
					</a>

					<div>
						<ImplicationFormula
							{type}
							assumptions={implication.assumptions}
							conclusions={implication.conclusions}
							is_equivalence={implication.is_equivalence}
							has_associated_assumptions={has_associated_assumptions(
								implication
							)}
							{highlighted_property}
						/>
					</div>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}

<style>
	.implication-container {
		display: inline-flex;
		gap: 0.5rem;
	}
</style>
