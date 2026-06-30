<script lang="ts">
	import TextWithProof from '$components/TextWithProof.svelte'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

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
</StructureDetailPage>
