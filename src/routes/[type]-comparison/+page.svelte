<script lang="ts">
	import ComparisonPage from '$pages/ComparisonPage.svelte'

	let { data } = $props()
</script>

<ComparisonPage {...data} />
