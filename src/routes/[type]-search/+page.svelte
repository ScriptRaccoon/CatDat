<script lang="ts">
	import { PLURALS } from '$shared/config'
	import SearchPage from '$pages/SearchPage.svelte'

	let { data } = $props()

	const sample_links = {
		category:
			'/category-search/results?satisfied=finitely_complete~pointed&unsatisfied=complete',
		functor: '/functor-search/results?satisfied=continuous&unsatisfied=cocontinuous',
		morphism:
			'/morphism-search/results?satisfied=monomorphism~epimorphism&unsatisfied=isomorphism',
		symmetric_monoidal_category:
			'/symmetric_monoidal_category-search/results?satisfied=cocomplete&unsatisfied=cartesian'
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
	{:else if data.type === 'symmetric_monoidal_category'}
		For example, you can
		<a href={sample_links.symmetric_monoidal_category}>look</a>
		for symmetric monoidal categories that are cocomplete, but not cartesian.
	{/if}
</SearchPage>
