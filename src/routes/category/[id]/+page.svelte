<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import TextWithProof from '$components/TextWithProof.svelte'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import PropertyAssignmentList from '$components/PropertyAssignmentList.svelte'
	import CommentList from '$components/CommentList.svelte'
	import TagList from '$components/TagList.svelte'
	import CategoryDescription from '$components/CategoryDescription.svelte'
	import UndistinguishableStructures from '$components/UndistinguishableStructures.svelte'

	let { data } = $props()
</script>

<MetaData
	title={data.category.name}
	description="Discover the properties of this category"
/>

<h2>{data.category.name}</h2>

<TagList tags={data.tags} type="category" />

<CategoryDescription
	category={data.category}
	related_categories={data.related_categories}
/>

<PropertyAssignmentList
	type="category"
	satisfied_properties={data.satisfied_properties}
	unsatisfied_properties={data.unsatisfied_properties}
	unknown_properties={data.unknown_properties}
	undecidable_properties={data.undecidable_properties}
/>

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

<UndistinguishableStructures
	type="category"
	structures={data.undistinguishable_categories}
	name={data.category.name}
/>

<CommentList comments={data.comments} />

<SuggestionForm />
