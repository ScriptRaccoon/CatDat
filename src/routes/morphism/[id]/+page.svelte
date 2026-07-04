<script lang="ts">
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

	let { data } = $props()
</script>

<StructureDetailPage type="morphism" {...data}>
	{#snippet definition()}
		<li>
			<strong>Ambient category:</strong>
			<a href="/category/{data.morphism.ambient_category}">
				{data.morphism.ambient_category_name}
			</a>
		</li>
	{/snippet}
</StructureDetailPage>
