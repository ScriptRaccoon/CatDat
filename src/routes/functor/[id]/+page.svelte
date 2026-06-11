<script lang="ts">
	import StructureDetailPage from '$components/StructureDetailPage.svelte'

	let { data } = $props()
</script>

<StructureDetailPage type="functor" {...data}>
	{#snippet definition()}
		<li>
			<strong>Source:</strong>
			<a href="/category/{data.functor.source}">{data.functor.source_name}</a>
		</li>

		<li>
			<strong>Target:</strong>
			<a href="/category/{data.functor.target}">{data.functor.target_name}</a>
		</li>

		{#if data.functor.left_adjoint}
			<li>
				<strong>Left adjoint:</strong>
				<a
					href="/functor/{data.functor.left_adjoint.id}"
					aria-label={data.functor.left_adjoint.name}
				>
					{@html data.functor.left_adjoint.notation}
				</a>
			</li>
		{/if}

		{#if data.functor.right_adjoint}
			<li>
				<strong>Right adjoint:</strong>
				<a
					href="/functor/{data.functor.right_adjoint.id}"
					aria-label={data.functor.right_adjoint.name}
				>
					{@html data.functor.right_adjoint.notation}
				</a>
			</li>
		{/if}
	{/snippet}
</StructureDetailPage>
