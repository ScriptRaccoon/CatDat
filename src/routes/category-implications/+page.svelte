<script lang="ts">
	import ImplicationListPage from '$pages/ImplicationListPage.svelte'

	let { data } = $props()
</script>

<ImplicationListPage implications={data.implications} type="category">
	{#snippet hints()}
		<p class="hint">
			*Deductions from these implications are automatically incorporated into each
			category whenever applicable. For instance, if a category is identified as
			complete, the property of having a terminal object is automatically inferred
			and added.
		</p>

		<p class="hint">
			Implications can be combined to yield longer, non-obvious deductions that are
			not explicitly listed above. For example, the listed implications imply that
			every inhabited groupoid with binary products is trivial.
		</p>

		<p class="hint">
			Moreover, implications are automatically dualized when the corresponding dual
			properties exist. For example, the statement that finitely complete categories
			with cofiltered limits are complete automatically implies that finitely
			cocomplete categories with filtered colimits are cocomplete. Similarly, if a
			category is self-dual and, for example, complete, it is automatically inferred
			to be cocomplete as well.
		</p>

		<p class="hint">
			For results that do not quite fit the implication model,
			<a href="/content">content pages</a> are used instead.
		</p>
	{/snippet}
</ImplicationListPage>
