<script lang="ts">
	import CommentList from '$components/CommentList.svelte'
	import FunctorDescription from '$components/FunctorDescription.svelte'
	import MetaData from '$components/MetaData.svelte'
	import PropertyAssignmentList from '$components/PropertyAssignmentList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import TagList from '$components/TagList.svelte'
	import UndistinguishableStructures from '$components/UndistinguishableStructures.svelte'

	let { data } = $props()
</script>

<MetaData
	title={data.functor.name}
	description="Discover the properties of this functor"
/>

<h2>{data.functor.name}</h2>

<TagList tags={data.tags} type="functor" />

<FunctorDescription
	functor={data.functor}
	related_functors={data.related_structures}
	left_adjoint={data.functor.left_adjoint}
	right_adjoint={data.functor.right_adjoint}
/>

<PropertyAssignmentList
	type="functor"
	satisfied_properties={data.satisfied_properties}
	unsatisfied_properties={data.unsatisfied_properties}
	unknown_properties={data.unknown_properties}
	undecidable_properties={data.undecidable_properties}
/>

<UndistinguishableStructures
	type="functor"
	structures={data.undistinguishable_structures}
	name={data.functor.name}
/>

<CommentList comments={data.comments} />

<SuggestionForm />
