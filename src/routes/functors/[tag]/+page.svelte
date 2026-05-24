<script lang="ts">
	import TaggedPage from '$pages/TaggedPage.svelte'

	let { data } = $props()
</script>

<TaggedPage type="functor" structures={data.functors} tag={data.tag} />
