<script lang="ts">
	import type { FunctorDisplay, RelatedStructure } from '$lib/commons/types'

	type Props = {
		functor: FunctorDisplay
		related_functors: RelatedStructure[]
		left_adjoint?: RelatedStructure
		right_adjoint?: RelatedStructure
	}

	let { functor, related_functors, left_adjoint, right_adjoint }: Props = $props()
</script>

<section aria-label="main info">
	<ul class="with-margins">
		<li>
			<strong>notation:</strong>
			{@html functor.notation}
		</li>

		<li>
			<strong>Source:</strong>
			<a href="/category/{functor.source}">{functor.source_name}</a>
		</li>

		<li>
			<strong>Target:</strong>
			<a href="/category/{functor.target}">{functor.target_name}</a>
		</li>

		{#if left_adjoint}
			<li>
				<strong>Left adjoint:</strong>
				<a href="/functor/{left_adjoint.id}" aria-label={left_adjoint.name}>
					{@html left_adjoint.notation}
				</a>
			</li>
		{/if}

		{#if right_adjoint}
			<li>
				<strong>Right adjoint:</strong>
				<a href="/functor/{right_adjoint.id}" aria-label={right_adjoint.name}>
					{@html right_adjoint.notation}
				</a>
			</li>
		{/if}

		{#if related_functors.length}
			<li>
				<strong>Related functors:</strong>
				{#each related_functors as { id, notation, name }, i}
					<a href="/functor/{id}" aria-label={name}>
						{@html notation}
					</a>{#if i < related_functors.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

		{#if functor.nlab_link}
			<li>
				<a href={functor.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}
	</ul>

	<p>{@html functor.description}</p>
</section>

<style>
	section {
		margin-top: 1.5rem;
	}
</style>
