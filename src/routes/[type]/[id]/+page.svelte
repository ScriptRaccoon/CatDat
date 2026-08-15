<script lang="ts">
	import CategoryDetailPage from '$pages/CategoryDetailPage.svelte'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

	let { data } = $props()
</script>

{#if data.special_structure_data.type === 'category'}
	<CategoryDetailPage {...data.structure_data} {...data.special_structure_data} />
{:else}
	<StructureDetailPage {...data.structure_data} {...data.special_structure_data} />
{/if}
