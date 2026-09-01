<script lang="ts">
	import CommentList from '$components/CommentList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import PropertyAssignmentList from '$components/PropertyAssignmentList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import TagList from '$components/TagList.svelte'
	import IndistinguishableStructures from '$components/IndistinguishableStructures.svelte'
	import StructuresBasedOn from '$components/StructuresBasedOn.svelte'
	import type {
		AssociatedStructure,
		CommentObject,
		PropertyAssignmentDisplay,
		PropertyShort,
		RelatedStructure,
		StructureDisplay,
		StructureShort,
		StructureShortDictionary,
		StructureType
	} from '$lib/commons/types'
	import type { Snippet } from 'svelte'
	import { capitalize, remove_underscores } from '$shared/utils'

	type Props = {
		type: StructureType
		structure: StructureDisplay
		associated_structures: AssociatedStructure[]
		related_structures: RelatedStructure[]
		structures_based_on: StructureShortDictionary
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
	}

	let {
		type,
		structure,
		associated_structures,
		related_structures,
		structures_based_on,
		children,
		tags,
		satisfied_properties,
		unsatisfied_properties,
		unknown_properties,
		undecidable_properties,
		indistinguishable_structures,
		comments,
		definition,
		specials
	}: Props = $props()
</script>

<MetaData title={structure.name} description="Discover the properties of this {type}" />

<h2>{structure.name}</h2>

<TagList {tags} {type} sort="structure" />

<section aria-label="main info" class="information-table">
	<strong>Notation</strong>
	<span>
		{@html structure.notation}
	</span>

	{@render definition?.()}

	{#each associated_structures as a}
		<strong>{capitalize(remove_underscores(a.label))}</strong>
		<span><a href="/{a.associated_type}/{a.id}">{a.name}</a></span>
	{/each}

	{#if structure.parent}
		<strong>Parent</strong>
		<span>
			<a href="/{type}/{structure.parent}" aria-label={structure.parent_name}>
				{@html structure.parent_notation}
			</a>
		</span>
	{/if}

	{#if children.length}
		<strong>Children</strong>
		<span>
			{#each children as { id, name, notation }, i}
				<a href="/{type}/{id}" aria-label={name}>
					{@html notation}
				</a>{#if i < children.length - 1}
					,&nbsp;
				{/if}
			{/each}
		</span>
	{/if}

	{#if related_structures.length}
		<strong>Related</strong>
		<span>
			{#each related_structures as { id, name, notation }, i}
				<a href="/{type}/{id}" aria-label={name}>
					{@html notation}
				</a>{#if i < related_structures.length - 1}
					,&nbsp;
				{/if}
			{/each}
		</span>
	{/if}

	{#if structure.nlab_link}
		<strong>External</strong>
		<span>
			<a href={structure.nlab_link} target="_blank">nLab Link</a>
		</span>
	{/if}

	{#if structure.dual_structure_id}
		<strong>Dual</strong>
		<span>
			<a
				href="/{type}/{structure.dual_structure_id}"
				aria-label={structure.dual_structure_name}
			>
				{@html structure.dual_structure_notation}
			</a>
		</span>
	{/if}
</section>

<p>{@html structure.description}</p>

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

<StructuresBasedOn {structures_based_on} structure_name={structure.name} />

<SuggestionForm />

<style>
	.information-table {
		margin-top: 1.5rem;
	}
</style>
