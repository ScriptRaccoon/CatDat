<script lang="ts">
	import TextWithProof from '$components/TextWithProof.svelte'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'
	import StructureList from '$components/StructureList.svelte'
	import { pluralize } from '$lib/client/utils.js'

	let { data } = $props()
</script>

<StructureDetailPage type="category" {...data}>
	{#snippet definition()}
		<li>
			<strong>objects:</strong>
			{@html data.category.objects}
		</li>
		<li>
			<strong>morphisms:</strong>
			{@html data.category.morphisms}
		</li>
	{/snippet}

	{#snippet specials()}
		<section>
			<h3>Special objects</h3>

			{#if data.category.special_objects.length}
				<ul class="with-margins">
					{#each data.category.special_objects as obj}
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
				{#each data.category.special_morphisms as obj}
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
		{#if data.category.functors.length}
			<section>
				<h3>Functors</h3>

				<p class="hint">
					{pluralize(data.category.functors.length, {
						one: 'There is 1 functor',
						other: 'There are {count} functors',
					})}
					whose source or target is the {data.structure.name}.
				</p>
				<StructureList structures={data.category.functors} type="functor" />
			</section>
		{/if}
	{/snippet}
</StructureDetailPage>
