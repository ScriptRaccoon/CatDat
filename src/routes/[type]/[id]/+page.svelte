<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import TextWithProof from '$components/TextWithProof.svelte'
	import { pluralize } from '$lib/client/utils'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<!-- TODO: clean up this mess -->

{#if data.special_structure_data.category}
	{@const category = data.special_structure_data.category}
	<StructureDetailPage {...data}>
		{#snippet definition()}
			<li>
				<strong>objects:</strong>
				{@html category.objects}
			</li>
			<li>
				<strong>morphisms:</strong>
				{@html category.morphisms}
			</li>
		{/snippet}

		{#snippet specials()}
			<section>
				<h3>Special objects</h3>

				{#if category.special_objects.length}
					<ul class="with-margins">
						{#each category.special_objects as obj}
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
					{#each category.special_morphisms as obj}
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
			{#if category.functors.length}
				<section>
					<h3>Functors</h3>

					<p class="hint">
						{pluralize(category.functors.length, {
							one: 'There is 1 functor',
							other: 'There are {count} functors',
						})}
						whose source or target is the {data.structure.name}.
					</p>
					<StructureList structures={category.functors} type="functor" />
				</section>
			{/if}
		{/snippet}
	</StructureDetailPage>
{:else if data.special_structure_data.functor}
	{@const functor = data.special_structure_data.functor}
	<StructureDetailPage {...data}>
		{#snippet definition()}
			<li>
				<strong>Source:</strong>
				<a href="/category/{functor.source}">{functor.source_name}</a>
			</li>

			<li>
				<strong>Target:</strong>
				<a href="/category/{functor.target}">{functor.target_name}</a>
			</li>

			{#if functor.left_adjoint}
				<li>
					<strong>Left adjoint functor:</strong>
					<a
						href="/functor/{functor.left_adjoint}"
						aria-label={functor.left_adjoint_name}
					>
						{@html functor.left_adjoint_notation}
					</a>
				</li>
			{/if}

			{#if functor.right_adjoint}
				<li>
					<strong>Right adjoint functor:</strong>
					<a
						href="/functor/{functor.right_adjoint}"
						aria-label={functor.right_adjoint_name}
					>
						{@html functor.right_adjoint_notation}
					</a>
				</li>
			{/if}
		{/snippet}
	</StructureDetailPage>
{:else if data.special_structure_data.morphism}
	{@const morphism = data.special_structure_data.morphism}
	<StructureDetailPage {...data}>
		{#snippet definition()}
			<li>
				<strong>Category:</strong>
				<a href="/category/{morphism.category}">
					{morphism.category_name}
				</a>
			</li>
		{/snippet}
	</StructureDetailPage>
{/if}
