<script lang="ts">
	import SearchPage from '$pages/SearchPage.svelte'

	let { data } = $props()

	const SAMPLES = {
		category:
			'Search for categories with certain properties while excluding others. For example, you can <a href="/category-search/results?satisfied=finitely_complete~pointed&unsatisfied=complete">look</a> for categories that are finitely complete and pointed but not complete.',
		functor:
			'Search for functors with certain properties while excluding others. For example, you can <a href="/functor-search/results?satisfied=continuous&unsatisfied=cocontinuous">look</a> for functors that are continuous but not cocontinuous.',
		morphism:
			'Search for morphism with certain properties while excluding others. For example, you can <a href="/morphism-search/results?satisfied=monomorphism~epimorphism&unsatisfied=isomorphism">look</a> for morphisms which are monomorphisms and epimorphisms, but no isomorphisms.',
	}
</script>

<SearchPage {...data}>
	{@html SAMPLES[data.type]}
</SearchPage>
