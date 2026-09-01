<script lang="ts">
	import CategoryPage from '$pages/CategoryPage.svelte'
	import StructurePage from '$pages/StructurePage.svelte'

	let { data } = $props()
</script>

{#if data.special_structure_data.type === 'category'}
	<CategoryPage {...data.structure_data} {...data.special_structure_data} />
{:else}
	<StructurePage {...data.structure_data} {...data.special_structure_data} />
{/if}
