<script lang="ts">
	import ComparisonResultPage from '$pages/ComparisonResultPage.svelte'

	let { data } = $props()
</script>

<ComparisonResultPage type="functor" {...data} />
