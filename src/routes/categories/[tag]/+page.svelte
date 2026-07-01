<script lang="ts">
	import TaggedStructuresPage from '$pages/TaggedStructuresPage.svelte'

	let { data } = $props()
</script>

<TaggedStructuresPage type="category" {...data} />
