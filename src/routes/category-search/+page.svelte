<script lang="ts">
	import SearchPage from '$pages/SearchPage.svelte'

	let { data } = $props()

	const sample_search_url = `/category-search/results?satisfied=finitely_complete~pointed&unsatisfied=complete`
</script>

<SearchPage type="category" all_properties={data.all_properties}>
	Search for categories with certain properties while excluding others. For example, you
	can <a href={sample_search_url}>look</a> for categories that are finitely complete and pointed
	but not complete.
</SearchPage>
