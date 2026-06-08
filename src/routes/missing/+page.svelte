<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { get_property_url } from '$lib/commons/property.url'

	const { data } = $props()
</script>

<MetaData
	title="Missing data in CatDat"
	description="Missing properties, missing special morphisms, missing combinations, and more."
/>

<h2>Missing data</h2>

<p>
	This page lists some missing data in the database. Please help us fill in the gaps by
	<a href="/content/contribute">contributing</a> to this project.
</p>

<section>
	<h3>Categories with unknown properties</h3>

	<p class="hint">
		There are {data.categories_with_unknown_properties.length} categories where at least
		one property is unknown.

		{#if data.total_unknown_category_property_pairs > 0}
			In total, there are
			{data.total_unknown_category_property_pairs}
			unknown (category, property)-pairs.
		{:else}
			🎉
		{/if}
	</p>

	<StructureList structures={data.categories_with_unknown_properties} type="category" />
</section>

<section>
	<h3>Functors with unknown properties</h3>

	<p class="hint">
		There are {data.functors_with_unknown_properties.length} functors where at least one
		property is unknown.

		{#if data.functors_with_unknown_properties.length > 0}
			In total, there are
			{data.total_unknown_functor_property_pairs}
			unknown (functor, property)-pairs.
		{:else}
			🎉
		{/if}
	</p>

	<StructureList structures={data.functors_with_unknown_properties} type="functor" />
</section>

<section>
	<h3>Categories with unknown special morphisms</h3>

	<p class="hint">
		There are {data.categories_with_missing_morphisms.length} categories where at least
		one type of special morphism is unknown.
	</p>

	<StructureList structures={data.categories_with_missing_morphisms} type="category" />
</section>

{#if data.undistinguishable_category_pairs.length > 0}
	<section>
		<h3>Undistinguishable category pairs</h3>

		<p class="hint">
			There are {data.undistinguishable_category_pairs.length} pairs of categories that
			cannot be distinguished by the properties currently recorded in the database. This
			indicates that the data may be incomplete or that a distinguishing property may
			be missing.
		</p>

		<ul class="with-margins">
			{#each data.undistinguishable_category_pairs as pair}
				<li>
					<a href="/category/{pair.id1}">
						{pair.name1}
					</a>
					&approx;
					<a href="/category/{pair.id2}">
						{pair.name2}
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/if}

{#if data.undistinguishable_functor_pairs.length > 0}
	<section>
		<h3>Undistinguishable functor pairs</h3>

		<p class="hint">
			There are {data.undistinguishable_functor_pairs.length} pairs of functors that cannot
			be distinguished by the properties currently recorded in the database. This indicates
			that the data may be incomplete or that a distinguishing property may be missing.
		</p>

		<ul class="with-margins">
			{#each data.undistinguishable_functor_pairs as pair}
				<li>
					<a href="/functor/{pair.id1}">
						{pair.name1}
					</a>
					&approx;
					<a href="/functor/{pair.id2}">
						{pair.name2}
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<section>
	<h3>Missing category combinations</h3>

	<p class="hint">
		Among the consistent category combinations of the form p &and; &not;q, the
		following are not yet witnessed by a category in the database or its dual
		category. If some of these combinations <i>are</i>
		inconsistent, this indicates that some
		<a href="/category-implications">implication</a> is missing.
	</p>

	<details>
		<summary>
			Show all {data.missing_category_combinations.length} combinations
		</summary>

		<ul class="combinations with-margins">
			{#each data.missing_category_combinations as [p, q]}
				<li class="combination">
					<a href={get_property_url(p, 'category')}>{p}</a> &and; &not;<a
						href={get_property_url(q, 'category')}>{q}</a
					>
				</li>
			{/each}
		</ul>
	</details>
</section>

<section>
	<h3>Missing functor combinations</h3>

	<p class="hint">
		Among the consistent functor combinations of the form p &and; &not;q, the
		following are not yet witnessed by a functor in the database or its dual functor.
		If some of these combinations <i>are</i>
		inconsistent, this indicates that some
		<a href="/functor-implications">implication</a> is missing.
	</p>

	<details>
		<summary>
			Show all {data.missing_functor_combinations.length} combinations
		</summary>

		<ul class="combinations with-margins">
			{#each data.missing_functor_combinations as [p, q]}
				<li class="combination">
					<a href={get_property_url(p, 'functor')}>{p}</a> &and; &not;<a
						href={get_property_url(q, 'functor')}>{q}</a
					>
				</li>
			{/each}
		</ul>
	</details>
</section>

<SuggestionForm />

<style>
	.combinations {
		margin-top: 0.5rem;

		a {
			text-decoration: none;
		}
	}
</style>
