<script lang="ts">
	import TaggedPropertiesPage from '$pages/TaggedPropertiesPage.svelte'

	let { data } = $props()
</script>

<TaggedPropertiesPage type="category" {...data} />
