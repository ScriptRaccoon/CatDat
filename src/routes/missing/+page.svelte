<script lang="ts">
	import CategoryList from '$components/CategoryList.svelte'
	import FunctorList from '$components/FunctorList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { get_property_url } from '$lib/commons/property.url'

	const { data } = $props()
</script>

<MetaData
	title="Missing data in CatDat"
	description="Missing properties, missing special morphisms, and more."
/>

<h2>Missing data</h2>

<p>
	This page lists some missing data in the database. Please help us fill in the gaps by
	<a href="/contribute">contributing</a> to this project.
</p>

<section>
	<h3>Categories with unknown properties</h3>

	<p class="hint">
		There are {data.categories_with_unknown_properties.length} categories that have some
		unknown properties.
	</p>

	<CategoryList categories={data.categories_with_unknown_properties} />
</section>

<section>
	<h3>Categories with properties without recorded reason</h3>

	<p class="hint">
		There are {data.categories_with_unreasoned_properties.length} categories with properties
		(satisfied or unsatisfied) that have no reason specified.
	</p>

	<CategoryList categories={data.categories_with_unreasoned_properties} />
</section>

<section>
	<h3>Categories with unknown special morphisms</h3>

	<p class="hint">
		There are {data.categories_with_missing_morphisms.length} categories where at least
		one type of special morphism is unknown.
	</p>

	<CategoryList categories={data.categories_with_missing_morphisms} />
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

		<ul>
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

<section>
	<h3>Missing combinations</h3>

	{#if data.missing_combinations}
		<p class="hint">
			Among the consistent combinations of the form p &and; &not;q, the following
			are not yet witnessed by a category in the database. If some of these
			combinations <i>are</i>
			inconsistent, this indicates that some
			<a href="/category-implications">implication</a> is missing.
		</p>

		<details>
			<summary>Show all {data.missing_combinations.length} combinations</summary>

			<ul class="combinations">
				{#each data.missing_combinations as [p, q]}
					<li class="combination">
						<a href={get_property_url(p)}>{p}</a> &and; &not;<a
							href={get_property_url(q)}>{q}</a
						>
					</li>
				{/each}
			</ul>
		</details>
	{:else}
		<p>Missing combinations could not be loaded</p>
	{/if}
</section>

<section>
	<h3>Functors with unknown properties</h3>

	<p class="hint">
		There are {data.functors_with_unknown_properties.length} categories that have some unknown
		properties.
	</p>

	<FunctorList functors={data.functors_with_unknown_properties} />
</section>

<style>
	.combinations {
		margin-top: 0.5rem;

		a {
			text-decoration: none;
		}
	}
</style>
