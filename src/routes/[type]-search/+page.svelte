<script lang="ts">
	import { PLURALS } from '$lib/commons/structures'
	import SearchPage from '$pages/SearchPage.svelte'

	let { data } = $props()

	const sample_links = {
		category:
			'/category-search/results?satisfied=finitely_complete~pointed&unsatisfied=complete',
		functor: '/functor-search/results?satisfied=continuous&unsatisfied=cocontinuous',
		morphism:
			'/morphism-search/results?satisfied=monomorphism~epimorphism&unsatisfied=isomorphism'
	}
</script>

<SearchPage {...data}>
	Search for {PLURALS[data.type]} with certain properties while excluding others.
	{#if data.type === 'category'}
		For example, you can
		<a href={sample_links.category}>look</a>
		for categories that are finitely complete and pointed, but not complete.
	{:else if data.type === 'functor'}
		For example, you can
		<a href={sample_links.functor}>look</a>
		for functors that are continuous, but not cocontinuous.
	{:else if data.type === 'morphism'}
		For example, you can
		<a href={sample_links.morphism}>look</a>
		for morphisms that are monomorphisms and epimorphisms, but no isomorphisms.
	{/if}
</SearchPage>
