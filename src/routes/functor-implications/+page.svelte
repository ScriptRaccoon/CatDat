<script lang="ts">
	import ImplicationListPage from '$pages/ImplicationListPage.svelte'

	let { data } = $props()
</script>

<ImplicationListPage implications={data.implications} type="functor">
	{#snippet hints()}
		<p class="hint">
			*Deductions from these implications are automatically incorporated into each
			functor whenever applicable. For instance, if a functor is identified as
			monadic, the property of being continuous is automatically inferred and added.
		</p>

		<p class="hint">
			Moreover, implications are automatically dualized when the corresponding dual
			properties exist. For example, the statement that a right adjoint is
			continuous automatically implies that a left adjoint is cocontinuous.
		</p>
	{/snippet}
</ImplicationListPage>
