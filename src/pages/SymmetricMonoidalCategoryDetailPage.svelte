<script lang="ts">
	import type {
		StructureDetails,
		SymmetricMonoidalCategorySpecificDisplay
	} from '$lib/commons/types'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

	type Props = StructureDetails & SymmetricMonoidalCategorySpecificDisplay

	let data: Props = $props()
</script>

<StructureDetailPage {...data}>
	{#snippet definition()}
		<li>
			<strong>Underlying category:</strong>
			<a href="/category/{data.underlying_category}">
				{data.underlying_category_name}
			</a>
		</li>
	{/snippet}
</StructureDetailPage>
