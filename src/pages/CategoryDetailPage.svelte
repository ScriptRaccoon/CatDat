<script lang="ts">
	import TextWithProof from '$components/TextWithProof.svelte'
	import type { StructureDetails, CategorySpecificDisplay } from '$lib/commons/types'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = StructureDetails & CategorySpecificDisplay

	let data: Props = $props()
</script>

<StructureDetailPage {...data}>
	{#snippet definition()}
		<li>
			<strong>Objects:</strong>
			{@html data.objects}
		</li>
		<li>
			<strong>Morphisms:</strong>
			{@html data.morphisms}
		</li>
	{/snippet}

	{#snippet specials()}
		<section>
			<h3>Special objects</h3>

			{#if data.special_objects.length}
				<ul class="with-margins">
					{#each data.special_objects as obj}
						<li>{obj.type}: {@html obj.description}</li>
					{/each}
				</ul>
			{:else}
				<p>&mdash;</p>
			{/if}
		</section>

		<section>
			<h3>Special morphisms</h3>

			<ul class="with-margins no-bullets">
				{#each data.special_morphisms as morph}
					<li>
						<TextWithProof proof={morph.proof}>
							{#if morph.description}
								{morph.type}: {@html morph.description}
							{:else}
								{morph.type}: <Fa icon={faQuestion} scale={0.825} />
							{/if}
						</TextWithProof>
					</li>
				{/each}
			</ul>
		</section>
	{/snippet}
</StructureDetailPage>
