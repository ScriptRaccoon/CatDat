<script lang="ts">
	import SearchPage from '$pages/SearchPage.svelte'

	let { data } = $props()

	const sample_search_url = `/functor-search/results?satisfied=continuous&unsatisfied=cocontinuous`
</script>

<SearchPage all_properties={data.all_properties} type="functor">
	Search for functors with certain properties while excluding others. For example, you
	can <a href={sample_search_url}>look</a> for functors that are continuous but not cocontinuous.
</SearchPage>
