<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import TextWithReason from '$components/TextWithReason.svelte'
	import { faQuestion } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import StructureList from '$components/StructureList.svelte'
	import PropertyAssignmentList from '$components/PropertyAssignmentList.svelte'
	import CommentList from '$components/CommentList.svelte'
	import TagList from '$components/TagList.svelte'
	import CategoryDescription from '$components/CategoryDescription.svelte'

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

	<ul class="with-margins">
		{#each data.special_morphisms as obj}
			<li>
				<TextWithReason reason={obj.reason}>
					{#if obj.description}
						{obj.type}: {@html obj.description}
					{:else}
						{obj.type}: <Fa icon={faQuestion} scale={0.825} />
					{/if}
				</TextWithReason>
			</li>
		{/each}
	</ul>
</section>

{#if data.undistinguishable_categories.length}
	<section>
		<h3>Undistinguishable categories</h3>

		<p class="hint">
			These categories in the database currently have exactly the same properties as
			the {data.category.name}. This indicates that the data may be incomplete or
			that a distinguishing property may be missing from the database.
		</p>

		<StructureList structures={data.undistinguishable_categories} type="category" />
	</section>
{/if}

<CommentList comments={data.comments} />

<SuggestionForm />
