<script lang="ts">
	import Fa from 'svelte-fa'
	import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
	import type { Snippet } from 'svelte'
	import { popup_state, show_popup } from './Popup.svelte'

	type Props = {
		children: Snippet
		proof?: string | null
	}

	let { children, proof }: Props = $props()

	const id = $props.id()

	function show_proof(e: MouseEvent) {
		e.stopPropagation()
		show_popup({
			id,
			heading: 'Proof',
			text: proof!,
		})
	}
</script>

{#if proof}
	<span class="wrapper" class:expanded={popup_state?.id === id}>
		<button onclick={show_proof} aria-label="Show proof">
			<Fa icon={faCommentDots} scale={0.825} />
		</button>

		<span>{@render children()}</span>
	</span>
{:else}
	<span>
		{@render children()}
	</span>
{/if}

<style>
	.wrapper {
		display: inline-flex;
		align-items: start;
		gap: 0.35rem;

		&.expanded {
			color: var(--accent-color);
		}
	}

	button {
		padding-inline: 0.25rem;
		margin-inline: -0.25rem;
		color: var(--secondary-text-color);
		transition: color 150ms;
	}
</style>
