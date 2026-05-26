<script lang="ts">
	import StructureList from '$components/StructureList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import PropertyList from '$components/PropertyList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'

	let { data } = $props()
</script>

<MetaData title={data.meta_data.title} description={data.meta_data.description} />

<div class="content">
	{@html data.html}
</div>

{#if data.meta_data.author}
	<p class="hint">Author: {data.meta_data.author}</p>
{/if}

{#if data.categories.length > 0 || data.category_properties.length > 0 || data.category_implications.length > 0}
	<h3>Context</h3>

	{#if data.categories.length > 0}
		<p class="hint">This page is referenced by the following categories.</p>

		<StructureList structures={data.categories} type="category" />
	{/if}

	{#if data.category_properties.length > 0}
		<p class="hint">
			This page is referenced by the following properties of categories.
		</p>

		<PropertyList properties={data.category_properties} type="category" />
	{/if}

	{#if data.category_implications.length > 0}
		<p class="hint">This page is referenced by the following implications.</p>

		<ul class="with-margins">
			{#each data.category_implications as { id }}
				<li>
					<a href="/category-implication/{id}">{id}</a>
				</li>
			{/each}
		</ul>
	{/if}
{/if}

<SuggestionForm />

<style>
	.content {
		line-height: 1.6;

		:global(img) {
			width: min(100%, 30rem);
			margin-inline: auto;
			border-radius: 1rem;
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

		:global(span.qed) {
			float: right;
		}
	}
</style>
