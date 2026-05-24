<script lang="ts">
	import ImplicationPage from '$pages/ImplicationPage.svelte'
	let { data } = $props()
</script>

<ImplicationPage
	type="functor"
	associated_type="category"
	implication={data.implication}
	structures={data.functors}
/>
