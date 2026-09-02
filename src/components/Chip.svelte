<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		handle_click?: () => void
		children: Snippet
		size?: 'small' | 'medium'
		selected?: boolean
		link?: string
	}

	let {
		handle_click,
		children,
		size = 'medium',
		selected = false,
		link
	}: Props = $props()
</script>

{#if link}
	<a href={link} class="chip {size}" onclick={handle_click} aria-current={selected}>
		{@render children()}
	</a>
{:else if handle_click}
	<button class="chip {size}" onclick={handle_click} aria-current={selected}>
		{@render children()}
	</button>
{/if}

<style>
	.chip {
		display: inline-block;
		border-radius: 100vw;
		background-color: var(--secondary-bg-color);
		outline: 1px solid var(--secondary-outline-color);
		transition: outline-color 150ms;
	}

	.chip.medium {
		font-size: 1rem;
		padding: 0.2rem 0.875rem;
	}

	.chip.small {
		font-size: 0.875rem;
		padding: 0.15rem 0.85rem;
	}

	.chip:hover,
	.chip:focus-visible {
		outline-color: var(--outline-color);
	}

	a.chip {
		text-decoration: none;
	}
</style>
