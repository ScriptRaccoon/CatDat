<script lang="ts">
	import PropertyListPage from '$pages/PropertyListPage.svelte'
	let { data } = $props()
</script>

<PropertyListPage type="functor" {...data} />
