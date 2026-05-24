<script lang="ts">
	import CommentList from '$components/CommentList.svelte'
	import FunctorDescription from '$components/FunctorDescription.svelte'
	import MetaData from '$components/MetaData.svelte'
	import PropertyAssignmentList from '$components/PropertyAssignmentList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import TagList from '$components/TagList.svelte'

	let { data } = $props()
</script>

<MetaData
	title={data.functor.name}
	description="Discover the properties of this functor"
/>

<h2>{data.functor.name}</h2>

<TagList tags={data.tags} type="category" />

<FunctorDescription functor={data.functor} related_functors={data.related_functors} />

<PropertyAssignmentList
	type="functor"
	satisfied_properties={data.satisfied_properties}
	unsatisfied_properties={data.unsatisfied_properties}
	unknown_properties={data.unknown_properties}
	undecidable_properties={data.undecidable_properties}
/>

<CommentList comments={data.comments} />

<SuggestionForm />
