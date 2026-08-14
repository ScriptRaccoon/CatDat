<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import TextWithProof from '$components/TextWithProof.svelte'
	import { pluralize } from '$shared/utils'
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

	{#snippet footer()}
		<!-- TODO: make this more systematic by looping over the structure_maps -->
		{#if data.stored_functors.length}
			<section>
				<h3>Functors</h3>

				<p class="hint">
					The database has stored
					{pluralize(data.stored_functors.length, {
						one: '{count} functor',
						other: '{count} functors'
					})}
					whose (co-)domain is the {data.structure.name}.
				</p>
				<StructureList structures={data.stored_functors} type="functor" />
			</section>
		{/if}

		{#if data.stored_morphisms.length}
			<section>
				<h3>Morphisms</h3>

				<p class="hint">
					The database has stored
					{pluralize(data.stored_morphisms.length, {
						one: '{count} morphism',
						other: '{count} morphisms'
					})}
					in the {data.structure.name}.
				</p>
				<StructureList structures={data.stored_morphisms} type="morphism" />
			</section>
		{/if}

		{#if data.stored_symmetric_monoidal_categories.length}
			<section>
				<h3>Symmetric monoidal categories</h3>

				<p class="hint">
					The database has stored
					{pluralize(data.stored_symmetric_monoidal_categories.length, {
						one: '{count} symmetric monoidal category',
						other: '{count} symmetric monoidal categories'
					})}
					based on the {data.structure.name}.
				</p>
				<StructureList
					structures={data.stored_symmetric_monoidal_categories}
					type="symmetric_monoidal_category"
				/>
			</section>
		{/if}
	{/snippet}
</StructureDetailPage>
