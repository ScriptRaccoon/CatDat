<script lang="ts">
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

	let { data } = $props()
</script>

<StructureDetailPage type="morphism" {...data}>
	{#snippet definition()}
		<li>
			<strong>Category:</strong>
			<a href="/category/{data.morphism.category}">
				{data.morphism.category_name}
			</a>
		</li>
	{/snippet}
</StructureDetailPage>
