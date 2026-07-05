<script lang="ts">
	import CategoryDetailPage from '$pages/CategoryDetailPage.svelte'
	import FunctorDetailPage from '$pages/FunctorDetailPage.svelte'
	import MorphismDetailPage from '$pages/MorphismDetailPage.svelte'

	let { data } = $props()
</script>

{#if data.special_structure_data.type === 'category'}
	<CategoryDetailPage {...data.structure_data} {...data.special_structure_data} />
{/if}

{#if data.special_structure_data.type === 'functor'}
	<FunctorDetailPage {...data.structure_data} {...data.special_structure_data} />
{/if}

{#if data.special_structure_data.type === 'morphism'}
	<MorphismDetailPage {...data.structure_data} {...data.special_structure_data} />
{/if}
