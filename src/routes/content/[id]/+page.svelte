<script lang="ts">
	import MetaData from '$components/MetaData.svelte'

	let { data } = $props()
</script>

<MetaData title={data.meta_data.title} description={data.meta_data.description} />

{@html data.html}

<style>
	:global(img) {
		width: min(100%, 30rem);
		margin-inline: auto;
		border-radius: 1rem;
	}
</style>
