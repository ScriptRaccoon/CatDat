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
			<a href="/category/{data.underlying_category.id}">
				{data.underlying_category.name}
			</a>
		</li>
	{/snippet}
</StructureDetailPage>
