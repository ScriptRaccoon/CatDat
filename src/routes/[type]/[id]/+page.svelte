<script lang="ts">
	import CategoryDetailPage from '$pages/CategoryDetailPage.svelte'
	import FunctorDetailPage from '$pages/FunctorDetailPage.svelte'
	import MorphismDetailPage from '$pages/MorphismDetailPage.svelte'
	import SymmetricMonoidalCategoryDetailPage from '$pages/SymmetricMonoidalCategoryDetailPage.svelte'

	let { data } = $props()
</script>

<!-- TODO: refactor this -->

{#if data.special_structure_data.type === 'category'}
	<CategoryDetailPage {...data.structure_data} {...data.special_structure_data} />
{/if}

{#if data.special_structure_data.type === 'functor'}
	<FunctorDetailPage {...data.structure_data} {...data.special_structure_data} />
{/if}

{#if data.special_structure_data.type === 'morphism'}
	<MorphismDetailPage {...data.structure_data} {...data.special_structure_data} />
{/if}

{#if data.special_structure_data.type === 'symmetric_monoidal_category'}
	<SymmetricMonoidalCategoryDetailPage
		{...data.structure_data}
		{...data.special_structure_data}
	/>
{/if}
