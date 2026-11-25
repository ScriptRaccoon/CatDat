<script lang="ts">
	import SearchFilter from './SearchFilter.svelte'
	import TextWithProof from './TextWithProof.svelte'
	import type {
		PropertyAssignmentDisplay,
		PropertyShort,
		StructureType
	} from '#lib/commons/types.ts'
	import {
		encode_property_ID,
		get_claim,
		get_property_label,
		get_property_url
	} from '#shared/property.utils.ts'
	import {
		get_comparison_score,
		rank_by_score,
		to_property_lookup_item
	} from '#lib/client/utils.ts'
	import { pluralize } from '#shared/utils.ts'

	type Props = {
		type: StructureType
		notation: string
		satisfied_properties: PropertyAssignmentDisplay[]
		unsatisfied_properties: PropertyAssignmentDisplay[]
		undecidable_properties: PropertyAssignmentDisplay[]
		unknown_properties: PropertyShort[]
		keywords: Record<string, string[]>
	}

	let {
		type,
		notation,
		satisfied_properties,
		unsatisfied_properties,
		undecidable_properties,
		unknown_properties,
		keywords
	}: Props = $props()

	let items = $derived([
		...satisfied_properties.map((p) => to_property_lookup_item(p, 'satisfied')),
		...unsatisfied_properties.map((p) => to_property_lookup_item(p, 'unsatisfied')),
		...undecidable_properties.map((p) => to_property_lookup_item(p, 'undecidable')),
		...unknown_properties.map((p) => to_property_lookup_item(p, 'unknown'))
	])

	let search = $state('')

	/**
	 * Matches of the property ID (scores 4 to 6) come before matches of
	 * its keywords (scores 1 to 3).
	 */
	function get_score(id: string) {
		const id_score = get_comparison_score(id, search)
		if (id_score > 0) return id_score + 3
		const keyword_scores = (keywords[id] ?? []).map((keyword) =>
			get_comparison_score(keyword, search)
		)
		return Math.max(0, ...keyword_scores)
	}

	let results = $derived.by(() => {
		if (!search) return []
		return rank_by_score(
			items,
			(item) => get_score(item.id),
			(item) => item.id
		)
	})
</script>

<section aria-label="property lookup" class="lookup" class:empty={!search}>
	<SearchFilter
		bind:search
		label="look up a property"
		placeholder="Look up a property..."
		full_width={true}
	/>

	{#if search}
		<p class="hint">
			{#if results.length}
				{pluralize(results.length, {
					one: 'Found {count} property',
					other: 'Found {count} properties'
				})}
			{:else}
				No property matches
			{/if}
		</p>

		{#if results.length}
			<ul class="no-bullets with-margins" aria-label="Property lookup results">
				{#each results as { id, relation, proof, status } (id)}
					<li>
						{#if proof}
							<TextWithProof
								claim={get_claim(
									notation,
									relation,
									id,
									status === 'undecidable'
								)}
								{proof}
								proof_key={encode_property_ID(id)}
								is_duplicate={true}
							>
								{relation}
								<a href={get_property_url(id, type)}>
									{get_property_label(id)}
								</a>
								{#if status === 'undecidable'}
									<span class="status">({status})</span>
								{/if}
							</TextWithProof>
						{:else}
							{relation}
							<a href={get_property_url(id, type)}>
								{get_property_label(id)}
							</a>
							<span class="status">({status})</span>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</section>

<style>
	.lookup.empty {
		/* cancels the top margin of the sticky heading below */
		margin-bottom: -1rem;
	}

	.status {
		color: var(--secondary-text-color);
	}
</style>
