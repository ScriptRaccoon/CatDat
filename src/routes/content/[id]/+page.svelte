<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { PLURALS, STRUCTURE_TYPES } from '$shared/config'
	import { remove_underscores } from '$shared/utils'
	import StructureList from '$components/StructureList.svelte'
	import PropertyList from '$components/PropertyList.svelte'
	import ImplicationList from '$components/ImplicationList.svelte'

	let { data } = $props()

	let has_context = $derived(
		Object.keys(data.structures_by_type).length ||
			Object.keys(data.properties_by_type).length ||
			Object.keys(data.implications_by_type).length
	)
</script>

<MetaData title={data.meta_data.title} description={data.meta_data.description} />

<div class="content">
	{@html data.html}
</div>

{#if has_context}
	<h3>Context</h3>

	{#each STRUCTURE_TYPES as type}
		{#if data.structures_by_type?.[type]?.length}
			<p class="hint">This page is referenced by the following {PLURALS[type]}.</p>
			<StructureList structures={data.structures_by_type[type]} {type} />
		{/if}

		{#if data.properties_by_type?.[type]?.length}
			<p class="hint">
				This page is referenced by the following properties of {PLURALS[type]}.
			</p>

			<PropertyList properties={data.properties_by_type[type]} {type} />
		{/if}

		{#if data.implications_by_type?.[type]?.length}
			<p class="hint">
				This page is referenced by the following {remove_underscores(type)} implications.
			</p>

			<ImplicationList implications={data.implications_by_type[type]} {type} />
		{/if}
	{/each}
{/if}

<SuggestionForm />

<style>
	.content {
		line-height: 1.6;

		:global(img) {
			border-radius: 0.5rem;
			border: 1px solid var(--secondary-outline-color);
		}

		:global(img.small) {
			margin-inline: auto;
			width: min(100%, 30rem);
		}

		:global(svg.diagram) {
			width: 100%;
			margin-block: 1rem;
		}

		:global(.theorem) {
			padding: 0.5rem 1rem;
			border-radius: 0.4rem;
			border: 1px solid var(--secondary-outline-color);
			background-color: var(--theorem-bg-color);
			margin-block: 1.5rem;

			:global(.theorem-title) {
				font-weight: 600;
				margin-right: 0.5rem;
			}

			:global(p:first-of-type) {
				display: inline;
			}

			:global(p:last-of-type) {
				margin-bottom: 0;
			}
		}

		:global(.proof) {
			:global(.proof-title) {
				font-style: italic;
			}

			:global(.qed) {
				float: right;
				margin-left: 0.5rem;
			}

			:global(.qed-clear) {
				display: block;
				clear: both;
			}
		}

		:global(pre) {
			padding: 1rem;
			border-radius: 0.75rem;
			font-size: 0.875rem;
			background-color: var(--secondary-bg-color);
		}

		:global(pre code) {
			white-space: pre-wrap;
		}
	}
</style>
