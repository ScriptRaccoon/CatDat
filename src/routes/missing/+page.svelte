<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { get_property_url } from '$shared/property.utils'
	import { PLURALS } from '$shared/config'
	import { STRUCTURE_TYPES } from '$shared/config'
	import { capitalize, pluralize, remove_underscores } from '$shared/utils'

	const { data } = $props()
</script>

<MetaData
	title="Missing data in CatDat"
	description="Missing properties, missing special morphisms, missing combinations, and more."
/>

<h1>Missing data</h1>

<p>
	This page lists some missing data in the database. Please help us fill in the gaps by
	<a href="/content/contribute">contributing</a> to this project.
</p>

{#each STRUCTURE_TYPES as type}
	{@const structures = data.structures_with_unknown_properties[type]}
	{@const total = data.unknown_totals[type]}
	<section>
		<h2>{capitalize(PLURALS[type])} with unknown properties</h2>

		<p class="hint">
			There are {structures.length}
			{PLURALS[type]}
			where at least one property is unknown.

			{#if total > 0}
				In total, there are {total} unknown ({type}, property)-pairs.
			{:else}
				🎉
			{/if}
		</p>

		<StructureList {structures} {type} />
	</section>
{/each}

<section>
	<h2>Categories with unknown special morphisms</h2>

	<p class="hint">
		There are {data.categories_with_missing_morphisms.length} categories where at least
		one type of special morphism is unknown.
	</p>

	<StructureList structures={data.categories_with_missing_morphisms} type="category" />
</section>

{#each STRUCTURE_TYPES as type}
	{@const pairs = data.indistinguishable_pairs[type]}

	{#if pairs.length > 0}
		<section>
			<h2>Indistinguishable {remove_underscores(type)} pairs</h2>

			<p class="hint">
				{pluralize(pairs.length, {
					one: 'There is {count} pair',
					other: 'There are {count} pairs'
				})}
				of {PLURALS[type]} that cannot be distinguished by the properties currently
				recorded in the database. This indicates that the data may be incomplete or
				that a distinguishing property may be missing.
			</p>

			<ul class="with-margins">
				{#each pairs as pair}
					<li>
						<a href="/{type}/{pair.id1}">
							{pair.name1}
						</a>
						&approx;
						<a href="/{type}/{pair.id2}">
							{pair.name2}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
{/each}

{#each STRUCTURE_TYPES as type}
	{@const combinations = data.missing_combinations[type]}

	<section>
		<h2>Missing {remove_underscores(type)} combinations</h2>

		{#if combinations.length}
			<p class="hint">
				Among the consistent {remove_underscores(type)} property combinations of the
				form p &and; &not;q, the following are not yet witnessed by a {remove_underscores(
					type
				)} in the database or its dual. If some of these combinations <i>are</i>
				inconsistent, this indicates that some
				<a href="/{type}-implications">implication</a> is missing.
			</p>

			<details>
				<summary>
					Show all {combinations.length} combinations
				</summary>

				<ul class="combinations with-margins">
					{#each combinations as [p, q]}
						<li class="combination">
							<a href={get_property_url(p, type)}>{p}</a> &and; &not;<a
								href={get_property_url(q, type)}>{q}</a
							>
						</li>
					{/each}
				</ul>
			</details>
		{:else}
			<p class="hint">
				Every consistent {remove_underscores(type)} property combination of the form
				p &and; &not;q is witnessed by a {remove_underscores(type)} in the database
				or its dual. 🎉
			</p>

			<p>&mdash;</p>
		{/if}
	</section>
{/each}

<SuggestionForm />

<style>
	.combinations {
		margin-top: 0.5rem;

		a {
			text-decoration: none;
		}
	}
</style>
