<script lang="ts">
	import StructureListPage from '$pages/StructureListPage.svelte'

	let { data } = $props()
</script>

<StructureListPage type="category" structures={data.categories} tags={data.tags} />
