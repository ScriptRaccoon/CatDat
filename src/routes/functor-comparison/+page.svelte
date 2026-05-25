<script lang="ts">
	import ComparisonPage from '$pages/ComparisonPage.svelte'

	let { data } = $props()
</script>

<ComparisonPage type="functor" structures={data.functors} />
