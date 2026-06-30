<script lang="ts">
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

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
				<strong>Left adjoint functor:</strong>
				<a
					href="/functor/{data.functor.left_adjoint}"
					aria-label={data.functor.left_adjoint_name}
				>
					{@html data.functor.left_adjoint_notation}
				</a>
			</li>
		{/if}

		{#if data.functor.right_adjoint}
			<li>
				<strong>Right adjoint functor:</strong>
				<a
					href="/functor/{data.functor.right_adjoint}"
					aria-label={data.functor.right_adjoint_name}
				>
					{@html data.functor.right_adjoint_notation}
				</a>
			</li>
		{/if}
	{/snippet}
</StructureDetailPage>
