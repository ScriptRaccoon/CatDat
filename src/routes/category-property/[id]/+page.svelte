<script lang="ts">
	import CategoryList from '$components/CategoryList.svelte'
	import ImplicationList from '$components/ImplicationList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { pluralize } from '$lib/client/utils'
	import { get_property_url } from '$lib/commons/property.url'

	let { data } = $props()
</script>

<MetaData title={data.property.id} description="Discover this property of categories" />

<h2>{data.property.id}</h2>

<p>
	{@html data.property.description}

	{#if data.property.invariant_under_equivalences === false}
		Warning: This property is not invariant under equivalences.
	{/if}
</p>

{#if data.property.dual_property_id || data.related_properties.length || data.property.nlab_link}
	<ul>
		{#if data.property.dual_property_id}
			<li>
				<strong>Dual property:</strong>
				<a href={get_property_url(data.property.dual_property_id)}
					>{data.property.dual_property_id}</a
				>
				{#if data.property.dual_property_id === data.property.id}
					(self-dual)
				{/if}
			</li>
		{/if}

		{#if data.related_properties.length}
			<li>
				<strong>Related properties:</strong>
				{#each data.related_properties as related_property, i}
					<a href={get_property_url(related_property)}>
						{related_property}
					</a>{#if i < data.related_properties.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

		{#if data.property.nlab_link}
			<li>
				<a href={data.property.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}
	</ul>
{/if}

<h3>Relevant implications</h3>

<ImplicationList
	implications={data.relevant_implications}
	highlighted_property={data.property.id}
/>

<h3>Examples</h3>

<p class="hint">
	{pluralize(data.examples.length, {
		one: 'There is {count} category with this property.',
		other: 'There are {count} categories with this property.',
	})}
</p>

<CategoryList categories={data.examples} />

<h3>Counterexamples</h3>

<p class="hint">
	{pluralize(data.counterexamples.length, {
		one: 'There is {count} category without this property.',
		other: 'There are {count} categories without this property.',
	})}
</p>

<CategoryList categories={data.counterexamples} />

<h3>Unknown</h3>

<p class="hint">
	{pluralize(data.unknown_categories.length, {
		one: 'There is {count} category for which the database has no information on whether it satisfies this property.',
		other: 'There are {count} categories for which the database has no information on whether they satisfy this property.',
	})}
	{#if data.unknown_categories.length > 0}
		Please help us fill in the gaps by
		<a href="/contribute">contributing</a> to this project.
	{/if}
</p>

<CategoryList categories={data.unknown_categories} />
