<script lang="ts">
	import MetaData from '$components/MetaData.svelte'

	let { data } = $props()
</script>

<MetaData
	title="Content pages"
	description="For long-form content, particularly longer proofs and reusable lemmas, we use content pages."
/>

<h2>Content pages</h2>

<p class="hint">
	For long-form content, particularly longer proofs and reusable lemmas, we use content
	pages.
</p>

<ul>
	{#each data.pages as page}
		<li>
			<a href="/content/{page.id}">{page.title}</a>
		</li>
	{/each}
</ul>
