<script lang="ts">
	import type { CategoryDisplay, RelatedCategory } from '$lib/commons/types'

	type Props = {
		category: CategoryDisplay
		related_categories: RelatedCategory[]
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
					<a href={`/category/${id}`} aria-label={name}>
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

		{#if category.dual_category_id}
			<li>
				<strong>Dual category:</strong>
				<a
					href="/category/{category.dual_category_id}"
					aria-label={category.dual_category_name}
				>
					{@html category.dual_category_notation}
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
