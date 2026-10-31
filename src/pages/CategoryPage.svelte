<script lang="ts">
	import TextWithProof from '#components/TextWithProof.svelte'
	import type { StructureDetails, CategorySpecificDisplay } from '#lib/commons/types.ts'
	import StructurePage from '#pages/StructurePage.svelte'
	import {
		get_property_url,
		get_special_morphism_plural
	} from '#shared/property.utils.ts'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = StructureDetails & CategorySpecificDisplay

	let data: Props = $props()
</script>

<StructurePage {...data}>
	{#snippet definition()}
		<strong>Objects</strong>
		<span> {@html data.objects}</span>

		<strong>Morphisms</strong>
		<span>{@html data.morphisms}</span>
	{/snippet}

	{#snippet specials()}
		<section>
			<h2>Special objects</h2>

			{#if data.special_objects.length}
				<ul class="with-margins">
					{#each data.special_objects as obj}
						<li>{obj.kind}: {@html obj.description}</li>
					{/each}
				</ul>
			{:else}
				<p>&mdash;</p>
			{/if}
		</section>

		<section>
			<h2>Special morphisms</h2>

			<ul class="with-margins no-bullets">
				{#each data.special_morphisms as morph}
					<li>
						<TextWithProof proof={morph.proof}>
							<a href={get_property_url(morph.kind, 'morphism')}>
								{get_special_morphism_plural(morph.kind)}
							</a>:
							{#if morph.description}
								{@html morph.description}
							{:else}
								<Fa icon={faQuestion} scale={0.825} />
							{/if}
						</TextWithProof>
					</li>
				{/each}
			</ul>
		</section>
	{/snippet}
</StructurePage>
