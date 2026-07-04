<script lang="ts">
	import SearchPage from '$pages/SearchPage.svelte'

	let { data } = $props()

	const sample_search_url = `/morphism-search/results?satisfied=monomorphism~epimorphism&unsatisfied=isomorphism`
</script>

<SearchPage type="morphism" {...data}>
	Search for morphism with certain properties while excluding others. For example, you
	can <a href={sample_search_url}>look</a> for morphisms which are monomorphisms and epimorphisms,
	but no isomorphisms.
</SearchPage>
