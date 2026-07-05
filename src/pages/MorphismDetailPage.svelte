<script lang="ts">
	import type { StructureDetails, MorphismSpecificDisplay } from '$lib/commons/types'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

	type Props = StructureDetails & MorphismSpecificDisplay

	let data: Props = $props()
</script>

<StructureDetailPage {...data}>
	{#snippet definition()}
		<li>
			<strong>Category:</strong>
			<a href="/category/{data.category}">
				{data.category_name}
			</a>
		</li>
	{/snippet}
</StructureDetailPage>
