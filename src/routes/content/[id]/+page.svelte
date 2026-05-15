<script lang="ts">
	import MetaData from '$components/MetaData.svelte'

	let { data } = $props()

	// TODO: extract title as metadata
</script>

<MetaData />

{@html data.content}

<style>
	:global(img) {
		width: min(100%, 30rem);
		margin-inline: auto;
		border-radius: 1rem;
	}
</style>
