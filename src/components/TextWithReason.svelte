<script lang="ts">
	import Fa from 'svelte-fa'
	import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
	import type { Snippet } from 'svelte'
	import { popup_state, show_popup } from './Popup.svelte'

	type Props = {
		children: Snippet
		reason?: string | null
		heading?: string
	}

	let { children, reason, heading = 'Reason' }: Props = $props()

	const id = $props.id()

	function show_reason(e: MouseEvent) {
		e.stopPropagation()
		show_popup({
			id,
			heading,
			text: reason!,
		})
	}
</script>

{#if reason}
	<span class="wrapper" class:expanded={popup_state?.id === id}>
		<span>
			<button onclick={show_reason} aria-label="Show reason">
				<Fa icon={faCommentDots} scale={0.825} />
			</button>

			{@render children()}
		</span>
	</span>
{:else}
	<span>
		{@render children()}
	</span>
{/if}

<style>
	.wrapper {
		display: inline-grid;

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
