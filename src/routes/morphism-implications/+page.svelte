<script lang="ts">
	import ImplicationListPage from '$pages/ImplicationListPage.svelte'

	let { data } = $props()
</script>

<ImplicationListPage implications={data.implications} type="morphism">
	{#snippet hints()}
		<p class="hint">
			*Deductions from these implications are automatically incorporated into each
			morphism whenever applicable. Moreover, implications are automatically
			dualized when the corresponding dual properties exist.
		</p>
	{/snippet}
</ImplicationListPage>
