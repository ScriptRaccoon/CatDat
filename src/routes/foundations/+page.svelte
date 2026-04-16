<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	let { data } = $props()
</script>

<MetaData
	title="Foundations"
	description="How to make sense of categories in set theory"
/>

{@html data.content}

<style>
	:global(img) {
		width: min(100%, 30rem);
		margin-inline: auto;
		border-radius: 1rem;
	}
</style>
