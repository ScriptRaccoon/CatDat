<script lang="ts">
	import TextWithProof from '#components/TextWithProof.svelte'
	import type { StructureDetails, CategorySpecificDisplay } from '#lib/commons/types.ts'
	import StructurePage from '#pages/StructurePage.svelte'
	import {
		encode_property_ID,
		get_property_url,
		get_special_morphism_plural
	} from '#shared/property.utils.ts'
	import { capitalize } from '#shared/utils.ts'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = StructureDetails & CategorySpecificDisplay

	let data: Props = $props()
</script>

<StructurePage {...data}>
	{#snippet definition()}
		<strong>Objects</strong>
		<span class="underline-formula-links"> {@html data.objects}</span>

		<strong>Morphisms</strong>
		<span class="underline-formula-links">{@html data.morphisms}</span>
	{/snippet}

	{#snippet specials()}
		<section>
			<h2>Special objects</h2>

			{#if data.special_objects.length}
				<ul class="with-margins underline-formula-links">
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

			<ul class="with-margins no-bullets underline-formula-links">
				{#each data.special_morphisms as morphism}
					<li>
						{#if morphism.proof}
							<TextWithProof
								claim="{capitalize(
									get_special_morphism_plural(morphism.kind)
								)} in {data.structure.notation}"
								proof={morphism.proof}
								proof_key={encode_property_ID(morphism.kind)}
							>
								<a href={get_property_url(morphism.kind, 'morphism')}>
									{get_special_morphism_plural(morphism.kind)}
								</a>:
								{@html morphism.description}
							</TextWithProof>
						{:else}
							<a href={get_property_url(morphism.kind, 'morphism')}>
								{get_special_morphism_plural(morphism.kind)}
							</a>:
							<Fa icon={faQuestion} scale={0.825} />
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/snippet}
</StructurePage>
