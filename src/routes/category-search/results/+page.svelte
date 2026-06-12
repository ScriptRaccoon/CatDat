<script lang="ts">
	import SearchResultsPage from '$pages/SearchResultsPage.svelte'

	let { data } = $props()
</script>

<SearchResultsPage type="category" {...data} />
