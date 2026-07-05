<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import TextWithProof from '$components/TextWithProof.svelte'
	import { pluralize } from '$lib/client/utils'
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
			<strong>objects:</strong>
			{@html data.objects}
		</li>
		<li>
			<strong>morphisms:</strong>
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
				{#each data.special_morphisms as obj}
					<li>
						<TextWithProof proof={obj.proof}>
							{#if obj.description}
								{obj.type}: {@html obj.description}
							{:else}
								{obj.type}: <Fa icon={faQuestion} scale={0.825} />
							{/if}
						</TextWithProof>
					</li>
				{/each}
			</ul>
		</section>
	{/snippet}

	{#snippet footer()}
		{#if data.functors.length}
			<section>
				<h3>Functors</h3>

				<p class="hint">
					{pluralize(data.functors.length, {
						one: 'There is 1 functor',
						other: 'There are {count} functors',
					})}
					whose source or target is the {data.structure.name}.
				</p>
				<StructureList structures={data.functors} type="functor" />
			</section>
		{/if}
	{/snippet}
</StructureDetailPage>
