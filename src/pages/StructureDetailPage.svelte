<script lang="ts">
	import CommentList from '$components/CommentList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import PropertyAssignmentList from '$components/PropertyAssignmentList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import TagList from '$components/TagList.svelte'
	import IndistinguishableStructures from '$components/IndistinguishableStructures.svelte'
	import { PLURALS } from '$shared/config'
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
		children: RelatedStructure[]
		tags: string[]
		satisfied_properties: PropertyAssignmentDisplay[]
		unsatisfied_properties: PropertyAssignmentDisplay[]
		unknown_properties: PropertyShort[]
		undecidable_properties: PropertyAssignmentDisplay[]
		indistinguishable_structures: StructureShort[]
		comments: CommentObject[]
		definition?: Snippet
		specials?: Snippet
		footer?: Snippet
	}

	let {
		type,
		structure,
		related_structures,
		children,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		indistinguishable_structures,
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
			<strong>Notation:</strong>
			{@html structure.notation}
		</li>

		{@render definition?.()}

		{#if structure.parent}
			<li>
				<strong>Parent:</strong>
				<a href="/{type}/{structure.parent}" aria-label={structure.parent_name}>
					{@html structure.parent_notation}
				</a>
			</li>
		{/if}

		{#if children.length}
			<li>
				<strong>Children:</strong>
				{#each children as { id, name, notation }, i}
					<a href="/{type}/{id}" aria-label={name}>
						{@html notation}
					</a>{#if i < children.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

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

	<p>{@html structure.description}</p>
</section>

<PropertyAssignmentList
	{type}
	{satisfied_properties}
	{unsatisfied_properties}
	{unknown_properties}
	{undecidable_properties}
/>

{@render specials?.()}

<IndistinguishableStructures
	{type}
	structures={indistinguishable_structures}
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
