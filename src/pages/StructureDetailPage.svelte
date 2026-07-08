<script lang="ts">
	import CommentList from '$components/CommentList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import PropertyAssignmentList from '$components/PropertyAssignmentList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import TagList from '$components/TagList.svelte'
	import UndistinguishableStructures from '$components/UndistinguishableStructures.svelte'
	import { PLURALS } from '$lib/commons/structures'
	import type {
		CommentObject,
		PropertyAssignmentDisplay,
		PropertyShort,
		RelatedStructure,
		StructureDisplay,
		StructureShort,
		StructureType
	} from '$lib/commons/types'
	import type { Snippet } from 'svelte'

	type Props = {
		type: StructureType
		structure: StructureDisplay
		related_structures: RelatedStructure[]
		tags: string[]
		satisfied_properties: PropertyAssignmentDisplay[]
		unsatisfied_properties: PropertyAssignmentDisplay[]
		unknown_properties: PropertyShort[]
		undecidable_properties: PropertyAssignmentDisplay[]
		undistinguishable_structures: StructureShort[]
		comments: CommentObject[]
		definition?: Snippet
		specials?: Snippet
		footer?: Snippet
	}

	let {
		type,
		structure,
		related_structures,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		undistinguishable_structures,
		comments,
		definition,
		specials,
		footer
	}: Props = $props()
</script>

<MetaData title={structure.name} description="Discover the properties of this {type}" />

<h2>{structure.name}</h2>

<TagList {tags} {type} sort="structure" />

<section aria-label="main info" class="main-info">
	<ul class="with-margins">
		<li>
			<strong>notation:</strong>
			{@html structure.notation}
		</li>

		{@render definition?.()}

		{#if related_structures.length}
			<li>
				<strong>Related {PLURALS[type]}:</strong>
				{#each related_structures as { id, name, notation }, i}
					<a href="/{type}/{id}" aria-label={name}>
						{@html notation}
					</a>{#if i < related_structures.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

		{#if structure.nlab_link}
			<li>
				<a href={structure.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}

		{#if structure.dual_structure_id}
			<li>
				<strong>Dual {type}:</strong>
				<a
					href="/{type}/{structure.dual_structure_id}"
					aria-label={structure.dual_structure_name}
				>
					{@html structure.dual_structure_notation}
				</a>
			</li>
		{/if}
	</ul>

	{#if structure.description}
		<p>{@html structure.description}</p>
	{/if}
</section>

<PropertyAssignmentList
	{type}
	{satisfied_properties}
	{unsatisfied_properties}
	{unknown_properties}
	{undecidable_properties}
/>

{@render specials?.()}

<UndistinguishableStructures
	{type}
	structures={undistinguishable_structures}
	name={structure.name}
/>

<CommentList {comments} />

{@render footer?.()}

<SuggestionForm />

<style>
	.main-info {
		margin-top: 1.5rem;
	}
</style>
