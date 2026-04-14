<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	let { data } = $props()
</script>

<MetaData
	title="Foundations"
	description="How to make sense of categories in set theory"
/>

{@html data.content}
