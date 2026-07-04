<script lang="ts">
	import PropertyPage from '$pages/PropertyPage.svelte'

	let { data } = $props()
</script>

<PropertyPage {...data} />
