<script lang="ts">
	import type { StructureDetails, FunctorSpecificDisplay } from '$lib/commons/types'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

	type Props = StructureDetails & FunctorSpecificDisplay

	let data: Props = $props()
</script>

<StructureDetailPage {...data}>
	<!-- TODO: generalize this to all structures -->

	{#snippet definition()}
		<li>
			<strong>Domain:</strong>
			<a href="/category/{data.domain.id}">{data.domain.name}</a>
		</li>

		<li>
			<strong>Codomain:</strong>
			<a href="/category/{data.codomain.id}">{data.codomain.name}</a>
		</li>

		{#if data.left_adjoint}
			<li>
				<strong>Left adjoint functor:</strong>
				<a
					href="/functor/{data.left_adjoint.id}"
					aria-label={data.left_adjoint.name}
				>
					{@html data.left_adjoint.notation}
				</a>
			</li>
		{/if}

		{#if data.right_adjoint}
			<li>
				<strong>Right adjoint functor:</strong>
				<a
					href="/functor/{data.right_adjoint.id}"
					aria-label={data.right_adjoint.name}
				>
					{@html data.right_adjoint.notation}
				</a>
			</li>
		{/if}
	{/snippet}
</StructureDetailPage>
