<script lang="ts">
	import type { StructureDetails, FunctorSpecificDisplay } from '$lib/commons/types'
	import StructureDetailPage from '$pages/StructureDetailPage.svelte'

	type Props = StructureDetails & FunctorSpecificDisplay

	let data: Props = $props()
</script>

<StructureDetailPage {...data}>
	{#snippet definition()}
		<li>
			<strong>Domain:</strong>
			<a href="/category/{data.domain}">{data.domain_name}</a>
		</li>

		<li>
			<strong>Codomain:</strong>
			<a href="/category/{data.codomain}">{data.codomain_name}</a>
		</li>

		{#if data.left_adjoint}
			<li>
				<strong>Left adjoint functor:</strong>
				<a
					href="/functor/{data.left_adjoint}"
					aria-label={data.left_adjoint_name}
				>
					{@html data.left_adjoint_notation}
				</a>
			</li>
		{/if}

		{#if data.right_adjoint}
			<li>
				<strong>Right adjoint functor:</strong>
				<a
					href="/functor/{data.right_adjoint}"
					aria-label={data.right_adjoint_name}
				>
					{@html data.right_adjoint_notation}
				</a>
			</li>
		{/if}
	{/snippet}
</StructureDetailPage>
