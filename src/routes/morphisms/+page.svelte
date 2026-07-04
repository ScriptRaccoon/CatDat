<script lang="ts">
	import StructureListPage from '$pages/StructureListPage.svelte'

	let { data } = $props()
</script>

<StructureListPage type="morphism" {...data} />
