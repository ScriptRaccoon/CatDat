<script lang="ts">
	import type {
		CategorySpecificDisplay,
		StructureDisplay,
		RelatedStructure,
	} from '$lib/commons/types'

	type Props = {
		category: CategorySpecificDisplay & StructureDisplay
		related_categories: RelatedStructure[]
	}

	let { category, related_categories }: Props = $props()
</script>

<section aria-label="main info">
	<ul class="with-margins">
		<li>
			<strong>notation:</strong>
			{@html category.notation}
		</li>

		<li>
			<strong>objects:</strong>
			{@html category.objects}
		</li>

		<li>
			<strong>morphisms:</strong>
			{@html category.morphisms}
		</li>

		{#if related_categories.length}
			<li>
				<strong>Related categories:</strong>
				{#each related_categories as { id, name, notation }, i}
					<a href="/category/{id}" aria-label={name}>
						{@html notation}
					</a>{#if i < related_categories.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

		{#if category.nlab_link}
			<li>
				<a href={category.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}

		{#if category.dual_structure_id}
			<li>
				<strong>Dual category:</strong>
				<a
					href="/category/{category.dual_structure_id}"
					aria-label={category.dual_structure_name}
				>
					{@html category.dual_structure_notation}
				</a>
			</li>
		{/if}
	</ul>

	{#if category.description}
		<p>{@html category.description}</p>
	{/if}
</section>

<style>
	section {
		margin-top: 1.5rem;
	}
</style>
