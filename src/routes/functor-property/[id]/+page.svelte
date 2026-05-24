<script lang="ts">
	import PropertyPage from '$pages/PropertyPage.svelte'

	let { data } = $props()
</script>

<PropertyPage
	type="functor"
	property={data.property}
	related_properties={data.related_properties}
	relevant_implications={data.relevant_implications}
	examples={data.examples}
	counterexamples={data.counterexamples}
	unknown_structures={data.unknown_functors}
	undecidable_structures={data.undecidable_functors}
/>
