<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import SearchFilter from '$components/SearchFilter.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import TagList from '$components/TagList.svelte'
	import { normalize_text, pluralize } from '$lib/client/utils'
	import { get_property_url } from '$lib/commons/property.url'
	import { PLURALS } from '$lib/commons/structures'
	import type { GroupedPropertyShort, StructureType } from '$lib/commons/types'

	let search = $state('')

	type Props = {
		type: StructureType
		grouped_properties: GroupedPropertyShort[]
		total: number
		grouped_total: number
		tags: string[]
	}

	let { type, grouped_properties, total, grouped_total, tags }: Props = $props()

	let searched_properties = $derived(
		search
			? grouped_properties.filter(
					(property) =>
						normalize_text(property.id).includes(normalize_text(search)) ||
						(!!property.dual_property_id &&
							normalize_text(property.dual_property_id).includes(
								normalize_text(search),
							)),
				)
			: grouped_properties,
	)
</script>

<MetaData title="Properties of {PLURALS[type]}" />

<h2>Properties of {PLURALS[type]}</h2>

<SearchFilter bind:search />

<p class="hint">
	{#if !search}
		Found {total} properties ({grouped_total} grouped)
	{:else}
		{pluralize(searched_properties.length, {
			one: 'Found {count} group',
			other: 'Found {count} groups',
		})}
	{/if}
</p>

<ul class="with-margins">
	{#each searched_properties as { id, relation, dual_property_id }}
		<li>
			{relation}
			<a href={get_property_url(id, type)}>{id}</a>
			{#if dual_property_id && id !== dual_property_id}
				/ <a href={get_property_url(dual_property_id, type)}>
					{dual_property_id}
				</a>
			{/if}
		</li>
	{/each}
</ul>

{#if tags.length > 0}
	<section class="tag-section">
		<h2>List of tags</h2>

		<TagList {tags} {type} sort="property" />
	</section>
{/if}

<SuggestionForm />

<style>
	.tag-section {
		margin-top: 2rem;
	}
</style>
