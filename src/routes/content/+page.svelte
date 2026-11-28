<script lang="ts">
	import MetaData from '#components/MetaData.svelte'
	import SearchFilter from '#components/SearchFilter.svelte'
	import { normalize_text, pluralize } from '#shared/utils.ts'

	let { data } = $props()

	let search = $state('')

	let searched_pages = $derived.by(() => {
		if (!search) return data.pages
		const query = normalize_text(search)
		return data.pages.filter(({ title }) => normalize_text(title).includes(query))
	})
</script>

<MetaData
	title="Content pages"
	description="For long-form content and reusable lemmas, we use content pages."
/>

<h1>Content pages</h1>

<p class="hint">For long-form content and reusable lemmas, we use content pages.</p>

<SearchFilter bind:search />

<p class="hint">
	{pluralize(searched_pages.length, {
		one: 'Found {count} page',
		other: 'Found {count} pages'
	})}
</p>

<ul>
	{#each searched_pages as page}
		<li>
			<a href="/content/{page.id}">{page.title}</a>
		</li>
	{/each}
</ul>
